import fs from 'fs';

const VAULT_URL = process.env.VAULT_ADDR;
const SHARED_DIR = '/app/vault_shared';

// Fonction utilitaire pour faire une pause
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let cachedDatabaseUrl: string | null = null;

export async function getDatabaseUrlFromVault(): Promise<string> {
  // Si l'URL a déjà été récupérée, on la renvoie directement (Pattern Singleton)
  if (cachedDatabaseUrl) return cachedDatabaseUrl;

  // --- NOUVEAU : ATTENTE ACTIVE DES IDENTIFIANTS APPROLE ---
  let retries = 15; // On va réessayer pendant 30 secondes max (15 * 2s)
  while (!fs.existsSync(`${SHARED_DIR}/role_id`) || !fs.existsSync(`${SHARED_DIR}/secret_id`)) {
    if (retries <= 0) {
      throw new Error(`❌ Timeout : Les fichiers AppRole n'ont pas été générés dans ${SHARED_DIR} après 30 secondes.`);
    }
    console.log(`⏳ [Next.js] En attente de la génération des clés AppRole par Vault... (${retries} tentatives restantes)`);
    await delay(2000); // Attendre 2 secondes
    retries--;
  }
  // ---------------------------------------------------------


  try {
    // 1. Lecture des identifiants AppRole depuis le volume partagé
    const roleId = fs.readFileSync(`${SHARED_DIR}/role_id`, 'utf8').trim();
    const secretId = fs.readFileSync(`${SHARED_DIR}/secret_id`, 'utf8').trim();

    // 2. Échange AppRole contre un Token éphémère
    const authRes = await fetch(`${VAULT_URL}/v1/auth/approle/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role_id: roleId, secret_id: secretId }),
    });

    if (!authRes.ok) throw new Error(`AppRole Login failed: ${authRes.statusText}`);
    const authData = await authRes.json();
    const vaultToken = authData.auth.client_token;

    // 3. Récupération de la database_url complète
    const secretRes = await fetch(`${VAULT_URL}/v1/secret/data/transcendence`, {
      headers: { 'X-Vault-Token': vaultToken },
    });

    if (!secretRes.ok) throw new Error(`Fetch secret failed: ${secretRes.statusText}`);
    const secretData = await secretRes.json();
    
    // 4. Stockage uniquement en mémoire RAM
    cachedDatabaseUrl = secretData.data.data.database_url;
    console.log("✅ [Vault] DATABASE_URL récupérée nativement en mémoirevive !");
    
    return cachedDatabaseUrl!;
  } catch (error) {
    console.error("❌ Erreur critique lors de la récupération du secret depuis Vault :", error);
    throw error;
  }
}
