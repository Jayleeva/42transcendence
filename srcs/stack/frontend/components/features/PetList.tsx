import PetCard from '@/components/features/PetCard';
import AddPetCard from '@/components/features/AddPetCard';

// check tout ca pas encore verif 
// faire layout ? ou alors faire un composant petlist qui va etre dynamique du coup

{/*
type Pet = { id: number; name: string; photoUrl: string | null };

type PetListProps = {
  pets: Pet[];
  isOwner: boolean;
};

export default function PetList({ pets, isOwner }: PetListProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {pets.map((pet) => (
        <PetCard key={pet.id} id={pet.id} name={pet.name} photoUrl={pet.photoUrl} />
      ))}
      {isOwner && <AddPetCard />}
    </div>
  );
}

// comme ca on peut reutiliser sur un profil de user si on est pas proprietaire la carte addpet existe pas

 */}