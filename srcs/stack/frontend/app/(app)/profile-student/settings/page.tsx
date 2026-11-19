// page de parametre de l'etudiant ( modification de ses infos, ajout de bio, photo de profil, etc )

import { redirect } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import PrefilledForm from '@/components/features/form/PrefilledForm';
import { detailedProfileFormFields, detailedProfileConf } from '@/utils/types/detailedProfileForm';
import { callApiWithCookie } from '@/utils/functions/callApiWithCookie';
import { StudentProfileFormState } from '@/utils/interfaces/ProfileFormStates';
import EditPasswordForm from '@/components/features/form/EditPasswordForm';
import MiniButton from '@/components/ui/MiniButton';
import DeleteButton from '@/components/ui/DeleteButton';

export const metadata={
    title:'Paramètres',
};

export default async function Page() {
  const userData = await callApiWithCookie('/api/users/me', 'GET');

  if (!userData) {
    redirect('/login');
  }


  return (
    <main className="flex flex-1 flex-col px-4 pt-4 pb-20">
        <BackButton />
       <div className="mx-auto flex w-full max-w-md flex-col gap-8 pt-4">
        <h1 className="font-display text-5xl font-bold text-center">
          Modifier le profil
        </h1>

        <PrefilledForm<StudentProfileFormState> fields={detailedProfileFormFields} miniconf={detailedProfileConf} initialData={userData} />

        {/* FORMULAIRE 3 : Changement de mot de passe*/}
        <section className="flex flex-col gap-4">
          <h2 className="font-bold">Changer de mot de passe</h2>
          <EditPasswordForm />
        </section>

        <DeleteButton path='/api/users/me'/>
        </div>
    </main>
  );
}

/*        
        <form className="flex flex-col gap-4">
          <section className="flex flex-col items-start gap-4">
            <h2 className="font-bold">Photo de profil</h2>}
            <Avatar src={undefined}></Avatar>
                <MiniButton type="button" variant="outline">Ajouter / modifier</MiniButton>
          </section>
          </form>

       
          <section className="flex flex-col gap-4">
            <h2 className="font-bold">A propos de moi</h2>
            <BioForm initialBio={userData.bio} />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-bold">Informations générales</h2>
            <PrefilledForm<StudentProfileFormState> fields={detailedProfileFormInputs} miniconf={detailedProfileConf} initialData={userData} />
          </section>
*/