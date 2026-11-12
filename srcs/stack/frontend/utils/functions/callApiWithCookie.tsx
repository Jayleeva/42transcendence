"use server"

import { cookies } from 'next/headers';

export async function callApiWithCookie(path: string, _method: string, arg?: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('transcendence.sid')?.value;
    const fullUrl = path.startsWith('http') ? path : `http://backend:8000${path}`;

    // 1. Préparation des headers (on ajoute le Cookie uniquement s'il existe déjà)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Forwarded-Proto': 'https',
      'Cookie': `transcendence.sid=${token}`,
    };

    // 2. Appel vers le backend Docker
    const response = await fetch(fullUrl , {
      method: _method,
      headers,
      // On n'envoie un body que si ce n'est pas un GET ou un HEAD
      body: _method !== 'GET' && _method !== 'HEAD' ? arg : undefined,
      cache: 'no-store',
    });

    if (!response.ok) {
      const textError = await response.text();
      console.log(`[callApiWithCookie] Erreur ${response.status} :`, textError);
      return null;
    }

    // 3. Si le backend renvoie un cookie de session (ex: lors du /login), on le sauvegarde dans le navigateur !
    const setCookieHeader = response.headers.get('set-cookie');
    console.log("[DEBUG COOKIE] En-tête brut reçu du backend :", setCookieHeader);

    if (setCookieHeader) {
      const match = setCookieHeader.match(/transcendence\.sid=([^;]+)/);
      console.log("[DEBUG COOKIE] Résultat du match :", match ? match : "Aucun match");

      if (match && match[1]) {
        cookieStore.set('transcendence.sid', match[1], { // 👈 Sans decodeURIComponent pour garder la valeur exacte
          httpOnly: true,
          path: '/',
          sameSite: 'lax',
        });
        console.log("[DEBUG COOKIE] Cookie enregistré avec succès dans cookieStore !");
      }
    }

   // 4. Gestion des réponses vides
    if (response.status === 204) {
      return { success: true };
    }

    const text = await response.text();
    if (!text) {
      return { success: true };
    }

    try {
      // On essaie de parser en JSON si le backend renvoie du JSON
      return JSON.parse(text);
    } catch {
      // Si le backend renvoie du texte brut (ex: "OK"), on le retourne sans planter
      return { message: text };
    }

  } catch (error: any) {
    console.log("[CRITICAL CATCH] La fonction a planté !");
    console.log("-> Nom de l'erreur :", error?.name);
    console.log("-> Message :", error?.message);
    console.log("-> Stack trace :", error?.stack);
    return null;
  }
}