import * as fs from 'fs';

const VAULT_URL = process.env.VAULT_ADDR || 'http://vault:8200';
const SHARED_DIR = '/app/vault_shared';

let cachedDatabaseUrl: string | null = null;

export async function getDatabaseUrlFromVault(): Promise<string> {
  if (cachedDatabaseUrl) return cachedDatabaseUrl;

  try {
    // 1. Lecture des identifiants AppRole du volume partagé
    const roleId = fs.readFileSync(`${SHARED_DIR}/role_id`, 'utf8').trim();
    const secretId = fs.readFileSync(`${SHARED_DIR}/secret_id`, 'utf8').trim();

    // 2. Connexion AppRole à l'API de Vault (Obtention du token)
    const authRes = await fetch(`${VAULT_URL}/v1/auth/approle/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role_id: roleId, secret_id: secretId }),
    });

    if (!authRes.ok) throw new Error(`AppRole Login failed: ${authRes.statusText}`);
    const authData = await authRes.json();
    const vaultToken = authData.auth.client_token;

    // 3. Récupération du secret final
    const secretRes = await fetch(`${VAULT_URL}/v1/secret/data/transcendence`, {
      headers: { 'X-Vault-Token': vaultToken },
    });

    if (!secretRes.ok) throw new Error(`Fetch secret failed: ${secretRes.statusText}`);
    const secretData = await secretRes.json();
    
    // 4. Stockage en mémoire RAM
    cachedDatabaseUrl = secretData.data.data.database_url;
    console.log("✅ [Vault] DATABASE_URL chargée nativement en RAM !");
    
    return cachedDatabaseUrl!;
  } catch (error) {
    console.error("❌ [Vault] Erreur de récupération du secret :", error);
    throw error;
  }
}
