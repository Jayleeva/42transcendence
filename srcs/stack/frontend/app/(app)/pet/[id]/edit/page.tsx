// faire une page pour modif le profil ? ou juste renvoyer sur la crea de profil deja pre rempli ? 

import BackButton from '@/components/ui/BackButton';
import PrefilledForm from '@/components/features/form/PrefilledForm';
import { petEditFormConf, petFormFields } from '@/utils/types/PetForm';
import { callApiWithCookie } from '@/utils/functions/callApiWithCookie';
import NotFound from '@/app/not-found';
import { PetProfileFormState } from '@/utils/interfaces/ProfileFormStates';
import DeleteButton from '@/components/ui/DeleteButton';

export const metadata={
    title:'Modifier un animal',
};

export default async function Page({
  params,
  }: {
  params: Promise<{ 'id': string }>;
  }) {
  // 1. On attend la résolution de params et on extrait 'user-id' dans la variable userId
  const { 'id': petId } = await params;
  const url = `/api/pets/${petId}`;
  
  // 2. On injecte userId directement dans l'URL de l'API
  const petData = await callApiWithCookie(url, 'GET');
  console.log("recieved petdata for searched pet = " + JSON.stringify(petData));
  if (!petData) {
    return (NotFound());
  }
  
  return (
    <main className="flex flex-1 flex-col px-4 pt-4 pb-12">
        <BackButton />
       <div className="mx-auto flex w-full max-w-md flex-col gap-8 pt-4">
        <h1 className="font-display text-5xl font-bold text-center">
          Modifier un animal
        </h1>

        <PrefilledForm<PetProfileFormState> fields={petFormFields} miniconf={petEditFormConf} endpoint={url} initialData={petData} />
        
        <DeleteButton path={url}/>
      </div>
    </main>
  );
}