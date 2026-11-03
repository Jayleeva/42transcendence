// page de parametre de l'etudiant ( modification de ses infos, ajout de bio, photo de profil, etc )

import BackButton from '@/components/ui/BackButton';
import MiniButton from '@/components/ui/MiniButton';
import Avatar from '@/components/ui/Avatar';
import Textarea from '@/components/ui/Textarea';
import { redirect } from 'next/navigation';
import PrefilledForm from '@/components/features/form/PrefilledForm';
import { detailedProfileAvatar, detailedProfileBio, detailedProfileConf, detailedProfileFormInputs, detailedProfilePassword } from '@/utils/types/detailedProfileForm';

async function getUserFromDb() {
  return {
    firstname: 'John',
    lastname: 'Doe',
    username: 'johny',
    email: 'john.doe@example.com',
  };
}

export default async function Page() {
  const userData = await getUserFromDb();
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

        {/* FORMULAIRE 1 : photo*/}
        <form className="flex flex-col gap-4">
          <section className="flex flex-col items-start gap-4">
            <h2 className="font-bold">Photo de profil</h2>
            {/* ici mettre l'avatar de photo de profil actuel
                est ce qu'on met un placeholder ? 
                est ce qu'il faut un petit bouton modif ? ou on clique dessus pour mnodif 
                Attention !! penser a integrer potentiellement une taille ( large ici )*/}
            <Avatar src="/Placeholder-test.png" alt="Test Avatar"></Avatar>
                <MiniButton type="button" variant="outline">Ajouter / modifier</MiniButton>
          </section>
          </form>

        {/* FORMULAIRE 2 : Info generale*/}
        <form className="flex flex-col gap-4">
          <section className="flex flex-col gap-4">
            <h2 className="font-bold">A propos de moi</h2>
            <div>
              <Textarea id="bio" name="bio" placeholder="Écrivez quelque chose à propos de vous..." maxLength={300} />
                  <MiniButton type="submit">Valider les modifications</MiniButton>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-bold">Informations générales</h2>
            <PrefilledForm inputs={detailedProfileFormInputs} miniconf={detailedProfileConf} initialData={userData} />
          </section>
        </form>

        {/* FORMULAIRE 3 : Changement de mot de passe*/}
        <form className="flex flex-col gap-4">
        <section className="flex flex-col gap-4">
          <h2 className="font-bold">Changer de mot de passe</h2>
            <PrefilledForm inputs={detailedProfilePassword} miniconf={detailedProfileConf} initialData={userData} />
        </section>
        </form>

        {/* Partie pour les animaux*/}
        <section className="flex flex-col gap-4">
          <h2 className="font-bold">Mes animaux</h2>
          {/* ici mettre les pet card 
            avatar dans une card
            + une card pour creer un pet */}
        </section>
            <div>
                {/* le boutton de supp un pet // changer en commemorer ?*/}
                <MiniButton type="submit">Supprimer</MiniButton>
            </div>
      </div>
    </main>
  );
}