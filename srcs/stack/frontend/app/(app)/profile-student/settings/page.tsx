// app/profile-student/settings/page.tsx
export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import MiniButton from '@/components/ui/MiniButton';
import Avatar from '@/components/ui/Avatar';
import BioForm from '@/components/features/form/BioForm';
import PrefilledForm, { StudentProfileFormState, PasswordFormState } from '@/components/features/form/PrefilledForm';
import { detailedProfileFormInputs, detailedProfilePassword, detailedProfileConf, modPasswordConf } from '@/utils/types/detailedProfileForm';
import { callApiWithCookie } from '@/utils/functions/callApiWithCookie';


export const metadata = {
  title: 'Paramètres',
};

export default async function Page() {
  const userData = await callApiWithCookie('/api/users/me', 'GET');

  if (!userData) {
    redirect('/login');
  }

  return (
    <main className="flex flex-1 flex-col px-4 pt-4 pb-12">
      <BackButton />
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 pt-4">
        <h1 className="font-display text-5xl font-bold text-center">
          Modifier le profil
        </h1>

        {/* FORMULAIRE 1 : Photo (à passer aussi en composant client plus tard) */}
        <section className="flex flex-col items-start gap-4">
          <h2 className="font-bold">Photo de profil</h2>
          <Avatar src={userData.avatarUrl || "/Placeholder-test.png"} alt="Avatar Utilisateur" />
          <MiniButton type="button" variant="outline">Ajouter / modifier</MiniButton>
        </section>

        {/* FORMULAIRE 2 : Biographie */}
        <BioForm initialBio={userData.bio} />

        {/* FORMULAIRE 3 : Informations générales */}
        <section className="flex flex-col gap-4">
          <h2 className="font-bold">Informations générales</h2>
          <PrefilledForm<StudentProfileFormState> fields={detailedProfileFormInputs} miniconf={detailedProfileConf} initialData={userData} />
        </section>

        {/* FORMULAIRE 4 : Changement de mot de passe */}
        <section className="flex flex-col gap-4">
          <h2 className="font-bold">Changer de mot de passe</h2>
          <PrefilledForm<PasswordFormState> fields={detailedProfilePassword} miniconf={modPasswordConf} initialData={userData} />
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
