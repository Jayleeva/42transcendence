import * as fs from 'fs';

const VAULT_URL = process.env.VAULT_ADDR || 'http://vault:8200';
const SHARED_DIR = '/app/vault_shared';

let cachedSecrets: Record<string, string> | null = null;

async function loadSecrets(): Promise<Record<string, string>> {
  if (cachedSecrets) return cachedSecrets;

  try {
    // 1. Lecture des identifiants AppRole du volume partagé
    const roleId = fs.readFileSync(`${SHARED_DIR}/backend_role_id`, 'utf8').trim();
    const secretId = fs.readFileSync(`${SHARED_DIR}/backend_secret_id`, 'utf8').trim();

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
    cachedSecrets = secretData.data.data;
    console.log("✅ [Vault] Secrets chargés en RAM :", Object.keys(cachedSecrets!).join(', '));
    
    return cachedSecrets!;
  } catch (error) {
    console.error("❌ [Vault] Erreur de récupération du secret :", error);
    throw error;
  }
}

// Récupérer un secret donné par son nom dans Vault (mis en cache après le premier appel).
export async function getVaultSecret(key: string): Promise<string> {
  const secrets = await loadSecrets();
  const value = secrets[key];

  if(!value) {
    throw new Error(`[Vault] Secret "${key}" manquant ou vide`);
  }
  return value;
}

// Réservé à PrismaModule : renvoie l'URL de connexion à la base de données.
export async function getDatabaseUrlFromVault(): Promise<string> {
  return getVaultSecret('database_url');
}
