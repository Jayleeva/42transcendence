// la page de profil d'un pet, avec ses infos et ses posts
// ici on mettra une condition ds le code pour differencier si c'est le pet de l'user ou pas 
// ( pour pouvoir modifier ou pas les infos du pet )

import PetCard from '@/components/features/PetCard';
import PhotoGallery from '@/components/features/PhotoGallery';

export const metadata={
    title:'Profil',
};

// hard code a remplacer par le back end
const photos = [
  { id: 1, url: '/Placeholder-test.png' },
  { id: 2, url: '/Placeholder-test.png' },

];

export default function Page() {
  return (
    <main className="flex flex-col gap-6 px-6 py-12 min-h-screen max-w-2xl mx-auto">
      
    <h1 className="font-display text-6xl font-bold text-center">Milo</h1>
      <PetCard 
        id={1} 
        type="dog" 
        race="chihuahuaaaaa" 
        photoUrl={undefined} 
        dateOfBirth="04/12/2024" 
        info="Test info" 
        isOwner={true}
        ownerProfileLink="/profile-student">
      </PetCard>
    <h2 className="font-display text-3xl font-bold pt-4">Galerie photo</h2>
    <PhotoGallery photos={photos} petName="Milo" isOwner={true} />
    </main>
  );
}

// attention changer le titre pour {pet.name} ??? 
// codé en dur ici mais a connecter avec le back 
