// page de parametre de l'etudiant ( modification de ses infos, ajout de bio, photo de profil, etc )
{/*
import Form from "@/components/features/form/Form";
import BackButton from "@/components/ui/BackButton";

export default function Page() {
      return (
        <main className="flex min-h-screen justify-center px-6 py-12">
            <div className="flex w-full max-w-md flex-col gap-6">
                <h2 className="font-display text-5xl font-bold text-center">
                    Modifier le profil
                </h2>
                <p className="font-bold">Photo de profil</p>
                <p className="font-bold">Bio</p>
                <p className="font-bold">Informations générales</p>
                <p className="font-bold">Changer de mot de passe ??</p>
                <p className="font-bold">Ajouter / enlever des animaux de compagnie</p>
            </div>
        </main>
      );
} */}

//import Avatar from '@/components/ui/Avatar';
import BackButton from '@/components/ui/BackButton';
import MiniButton from '@/components/ui/MiniButton';
import Input from '@/components/ui/Input';
//import Textarea from '@/components/ui/Textarea';

export default function Page() {
  return (
    <main className="flex flex-1 flex-col px-4 pt-4 pb-12">
        <BackButton />
       <div className="mx-auto flex w-full max-w-md flex-col gap-8 pt-4">

        <h1 className="font-display text-5xl font-bold text-center">
          Modifier le profil
        </h1>

        <form className="flex flex-col gap-8">
          <section className="flex flex-col items-start gap-4">
            <h2 className="font-bold">Photo de profil</h2>
            {/* ici mettre l'avatar de photo de profil actuel
                est ce qu'on met un placeholder ? 
                est ce qu'il faut un petit bouton modif ? ou on clique dessus pour mnodif */}
            <div>
                <MiniButton type="submit" variant="outline">Ajouter</MiniButton>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-bold">A propos de moi</h2>
            {/* Ici mettre le nouveau component pour text area 
                a faire
                utiliser ici, ds le profil student, et profil pet*/}
            <div>
                <MiniButton type="submit" variant="outline">Valider</MiniButton>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-bold">Informations générales</h2>
            {/* Est ce que tout ce qui est en dessous sera pre rempli ? vu que c'est deja dans la db ? 
                comment ca fonctionne si on modif des donnees existante ? ca ecrase dans la db et remplace ?*/}
            <Input id="firstname" name="firstname" type="text" label="Prénom" />
            <Input id="lastname" name="lastname" type="text" label="Nom" />
            <Input id="username" name="username" type="text" label="Pseudo" />
            <Input id="birth" name="birth" type="date" label="Date de naissance" />
            <Input id="email" name="email" type="email" label="Email" />
          </section>
            <div>
                <MiniButton type="submit" variant="outline">Valider les modifications</MiniButton>
            </div>
          
        </form>

        <section className="flex flex-col gap-4">
          <h2 className="font-bold">Changer de mot de passe</h2>
          {/* à faire : formulaire séparé 
            avec 3 champs : ancien, nouveau, conf 
            puis ajouter un autre bouton pour valide ca*/}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-bold">Mes animaux</h2>
          {/* ici mettre les pet card 
            avatar dans une card
            + une card pour creer un pet */}
        </section>
            <div>
                <MiniButton type="submit">Supprimer</MiniButton>
            </div>
      </div>
    </main>
  );
}