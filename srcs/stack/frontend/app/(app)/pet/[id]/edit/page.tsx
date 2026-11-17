// faire une page pour modif le profil ? ou juste renvoyer sur la crea de profil deja pre rempli ? 

import BackButton from '@/components/ui/BackButton';
import MiniButton from '@/components/ui/MiniButton';
import Input from '@/components/ui/Input';
import Avatar from '@/components/ui/Avatar';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import { petTypes } from '@/lib/petTypes';

export const metadata={
    title:'Modifier un animal',
};


export default function Page() {
  return (
    <main className="flex flex-1 flex-col px-4 pt-4 pb-12">
        <BackButton />
       <div className="mx-auto flex w-full max-w-md flex-col gap-8 pt-4">
        <h1 className="font-display text-5xl font-bold text-center">
          Modifier un animal
        </h1>

    {/* un seul form ici avec toutes les infos*/}
        <form className="flex flex-col gap-8">
          <section className="flex flex-col items-start gap-4">
            <h2 className="font-bold">Photo de l'animal</h2>
            <Avatar src={undefined}></Avatar>
                <MiniButton type="button" variant="outline">Ajouter / modifier</MiniButton>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-bold">Informations générales</h2>
            <Input id="name" name="name" type="text" label="Nom" required/>
            <Select 
              id="type"
              name="type" 
              label="Type d'animal" 
              placeholder="Sélectionnez un type d'animal"
              options={petTypes} 
              required
            />
            <Input id="race" name="race" type="text" label="Race de l'animal" />
            <Input id="birth" name="birth" type="date" label="Date de naissance" />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-bold">Description / informations </h2>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  placeholder="Écrivez quelque chose à propos de votre animal" 
                  maxLength={300} />
          </section>
            <div>
                <MiniButton type="submit" variant="outline">Valider les modifications</MiniButton>
            </div>
        </form>

      </div>
    </main>
  );
}