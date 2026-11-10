import { cookies } from 'next/headers';


export async function getDataFromDb(path:string, _method:string) {
  console.log("[STEP 1] Entrée dans getUserFromDb");
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('transcendence.sid')?.value;

    console.log("[STEP 2] Token extrait :", token ? "Oui (existe)" : "Non (indéfini)");

    if (!token) {
      console.log("[STEP 2b] Arrêt : Pas de token");
      return null;
    }

    console.log("[STEP 3] Lancement du fetch vers l'API...");
    
    const response = await fetch(path, {
      method: _method,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `transcendence.sid=${token}` 
      },
      cache: 'no-store' 
    });

    console.log("[STEP 4] Réponse reçue ! Statut HTTP :", response.status);

    if (!response.ok) {
      const textError = await response.text();
      console.log("[STEP 4b] Échec de l'API (not ok). Message :", textError);
      return null;
    }

    const data = await response.json();
    console.log("[STEP 5] JSON décodé avec succès :", data);
    return data;

  } catch (error: any) {
    console.log("[CRITICAL CATCH] La fonction a planté !");
    console.log("-> Nom de l'erreur :", error?.name);
    console.log("-> Message :", error?.message);
    console.log("-> Stack trace :", error?.stack);
    return null;
  }
}