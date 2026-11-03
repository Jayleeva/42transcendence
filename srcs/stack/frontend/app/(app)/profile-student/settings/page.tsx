// app/profile-student/settings/page.tsx

// 1. FORCE LE RENDU DYNAMIQUE POUR ÉVITER L'ERREUR DE BUILD AVEC LES COOKIES
export const dynamic = 'force-dynamic'; 

import { cookies } from 'next/headers';
import BackButton from '@/components/ui/BackButton';
import MiniButton from '@/components/ui/MiniButton';
import Avatar from '@/components/ui/Avatar';
import Textarea from '@/components/ui/Textarea';
import { redirect } from 'next/navigation';
import PrefilledForm from '@/components/features/form/PrefilledForm';
import { detailedProfileConf, detailedProfileFormInputs, detailedProfilePassword } from '@/utils/types/detailedProfileForm';

async function getUserFromDb() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    // Si pas de token, on évite un appel API inutile
    if (!token) return null;

    const response = await fetch('https://lauzanimo.ch/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `session_token=${token}` 
      },
      cache: 'no-store' 
    });

    if (!response.ok) {
      return null;
    }

    const userData = await response.json();
    return userData;

  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return null;
  }
}

export default async function Page() {
  const userData = await getUserFromDb();

  // Décommentez ceci dès que votre API d'authentification est prête et stable !
  // if (!userData) {
  //   redirect('/login');
  // }

  return (
    <main className="flex flex-1 flex-col px-4 pt-4 pb-12">
      <BackButton />
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 pt-4">
        <h1 className="font-display text-5xl font-bold text-center">
          Modifier le profil
        </h1>

        {/* FORMULAIRE 1 : Photo */}
        <form className="flex flex-col gap-4">
          <section className="flex flex-col items-start gap-4">
            <h2 className="font-bold">Photo de profil</h2>
            {/* Si l'API renvoie une image, on l'affiche, sinon placeholder */}
            <Avatar src={userData?.avatarUrl || "/Placeholder-test.png"} alt="Avatar Utilisateur" />
            <MiniButton type="button" variant="outline">Ajouter / modifier</MiniButton>
          </section>
        </form>

        {/* FORMULAIRE 2 : Biographie */}
        <form className="flex flex-col gap-4">
          <section className="flex flex-col gap-4">
            <h2 className="font-bold">A propos de moi</h2>
            <div>
              {/* Note: Pour un formulaire contrôlé ou pré-rempli côté serveur, 
                  on passe la valeur de l'API dans defaultValue */}
              <Textarea 
                id="bio" 
                name="bio" 
                placeholder="Écrivez quelque chose à propos de vous..." 
                maxLength={300} 
                defaultValue={userData?.bio || ''} 
              />
              <MiniButton type="submit">Valider les modifications</MiniButton>
            </div>
          </section>
        </form>


          {/* FORMULAIRE 3 : Informations générales */}
          <section className="flex flex-col gap-4">
            <h2 className="font-bold">Informations générales</h2>
            {/* L'objet userData est transmis ici pour pré-remplir les inputs */}
            <PrefilledForm inputs={detailedProfileFormInputs} miniconf={detailedProfileConf} initialData={userData} />
          </section>
        

        {/* FORMULAIRE 4 : Changement de mot de passe */}
          <section className="flex flex-col gap-4">
            <h2 className="font-bold">Changer de mot de passe</h2>
            <PrefilledForm inputs={detailedProfilePassword} miniconf={detailedProfileConf} initialData={userData} />
          </section>

        {/* Partie pour les animaux */}
        <section className="flex flex-col gap-4">
          <h2 className="font-bold">Mes animaux</h2>
        </section>
        <div>
          <MiniButton type="button">Supprimer</MiniButton>
        </div>
      </div>
    </main>
  );
}
