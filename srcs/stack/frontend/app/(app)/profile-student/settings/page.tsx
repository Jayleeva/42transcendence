// page de parametre de l'etudiant ( modification de ses infos, ajout de bio, photo de profil, etc )

import { redirect } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import MiniButton from '@/components/ui/MiniButton';
import Avatar from '@/components/ui/Avatar';
import BioForm from '@/components/features/form/BioForm';
import PrefilledForm, { StudentProfileFormState, PasswordFormState } from '@/components/features/form/PrefilledForm';
import { detailedProfileFormInputs, detailedProfilePassword, detailedProfileConf, modPasswordConf } from '@/utils/types/detailedProfileForm';
import { callApiWithCookie } from '@/utils/functions/callApiWithCookie';

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

        {/* FORMULAIRE 1 : photo*/}
        <form className="flex flex-col gap-4">
          <section className="flex flex-col items-start gap-4">
            <h2 className="font-bold">Photo de profil</h2>
            {/* ici mettre l'avatar de photo de profil actuel
                est ce qu'on met un placeholder ? 
                est ce qu'il faut un petit bouton modif ? ou on clique dessus pour mnodif 
                Attention !! penser a integrer potentiellement une taille ( large ici )*/}
            <Avatar src={undefined}></Avatar>
                <MiniButton type="button" variant="outline">Ajouter / modifier</MiniButton>
          </section>
          </form>

        {/* FORMULAIRE 2 : Info generale*/}
          <section className="flex flex-col gap-4">
            <h2 className="font-bold">A propos de moi</h2>
            <BioForm initialBio={userData.bio} />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-bold">Informations générales</h2>
            <PrefilledForm<StudentProfileFormState> fields={detailedProfileFormInputs} miniconf={detailedProfileConf} initialData={userData} />
          </section>

        {/* FORMULAIRE 3 : Changement de mot de passe*/}
        <section className="flex flex-col gap-4">
          <h2 className="font-bold">Changer de mot de passe</h2>
          <PrefilledForm<PasswordFormState> fields={detailedProfilePassword} miniconf={modPasswordConf} initialData={userData} />
        </section>
      </div>
    </main>
  );
}


// NEW VERSION WITH PROFIL FORM  ( a fusionner avec la version du dessus) 
// Je code a l'aveugle 

// import BackButton from '@/components/ui/BackButton';
// import MiniButton from '@/components/ui/MiniButton';
// import Input from '@/components/ui/Input';
// import ProfileForm from '@/components/features/form/ProfileForm';

// export const metadata = {
//   title: 'Paramètres',
// };

// export default function Page() {
//   return (
//     <main className="flex flex-1 flex-col px-4 pt-4 pb-20">
//       <BackButton />
//       <div className="mx-auto flex w-full max-w-md flex-col gap-8 pt-4">
//         <h1 className="font-display text-5xl font-bold text-center">
//           Modifier le profil
//         </h1>

//         {/* Photo + Bio + Infos générales */}
//         <ProfileForm />

//         {/*  Changement de mot de passe */}
//         <form className="flex flex-col gap-4">
//           <section className="flex flex-col gap-4">
//             <h2 className="font-bold">Changer de mot de passe</h2>
//             <Input id="oldpassword" name="oldpassword" type="password" label="Ancien mot de passe" />
//             <Input id="newpassword" name="newpassword" type="password" label="Nouveau mot de passe" />
//             <Input id="confpassword" name="confpassword" type="password" label="Confirmer le nouveau mot de passe" />
//             <div>
//               <MiniButton type="submit" variant="outline">
//                 Valider les modifications
//               </MiniButton>
//             </div>
//           </section>
//         </form>
//       </div>
//     </main>
//   );
// }

