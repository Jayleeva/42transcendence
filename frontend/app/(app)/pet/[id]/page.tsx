// la page de profil d'un pet, avec ses infos et ses posts
// ici on mettra une condition ds le code pour differencier si c'est le pet de l'user ou pas 
// ( pour pouvoir modifier ou pas les infos du pet )

import PetCard from '@/components/features/PetCard';

export default function Page() {
  return (
    <main className="flex flex-col items-start item-centerjustify-center gap-6 px-6 py-12 min-h-screen max-w-2xl mx-auto">
      
    <h1 className="font-display text-5xl font-bold text-center">
        Milo
    </h1>
      <PetCard id={1} type="dog" race="Golden Retriever" photoUrl={undefined} info="Test info"></PetCard>

    </main>
  );
}

// attention changer le titre pour {pet.name} ??? 