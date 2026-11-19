// la page de profil d'un pet, avec ses infos et ses posts
// ici on mettra une condition ds le code pour differencier si c'est le pet de l'user ou pas 
// ( pour pouvoir modifier ou pas les infos du pet )

import NotFound from '@/app/not-found';
import PetCard from '@/components/features/PetCard';
import PhotoGallery from '@/components/features/PhotoGallery';
import { callApiWithCookie } from '@/utils/functions/callApiWithCookie';

export const metadata={
    title:'Profil',
};


// hard code a remplacer par le back end
const photos = [
  { id: 1, url: '/images-test/milo-couch.jpg' },
  { id: 2, url: '/images-test/milo-beach.jpg' },
  { id: 3, url: '/images-test/milo-sunset.jpg' },
  { id: 4, url: '/images-test/milo-mountain.jpg' },
];

export default async function Page({
  params,
  }: {
  params: Promise<{ 'id': string }>;
  }) {
  // 1. On attend la résolution de params et on extrait 'user-id' dans la variable userId
  const { 'id': petId } = await params;
  
  // 2. On injecte userId directement dans l'URL de l'API
  const petData = await callApiWithCookie(`/api/pets/${petId}`, 'GET');
  console.log("recieved petdata for searched pet = " + JSON.stringify(petData));
  /*if (!petData) {
    return (NotFound());
  }*/

  return (
    <main className="flex flex-col gap-6 px-6 py-12 min-h-screen max-w-2xl mx-auto">
    <h1 className="font-display text-6xl font-bold text-center">{petData?.name} </h1>
      <PetCard 
        id={petData?.id} 
        type={petData?.type} 
        race={petData?.race} 
        photoUrl={petData?.photoUrl} 
        dateOfBirth={petData?.dateOfBirth} 
        info={petData?.info} 
        isOwner={petData?.isOwner}
        ownerProfileLink={petData?.ownerProfileLink} >
      </PetCard>
    <h2 className="font-display text-3xl font-bold pt-4">Galerie photo</h2>
    <PhotoGallery photos={photos} petName={petData?.name} isOwner={petData?.isOwner} />
    </main>
  );
}

// attention changer le titre pour {pet.name} ??? 
// codé en dur ici mais a connecter avec le back 
