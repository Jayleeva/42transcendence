import PetCard from '@/components/features/PetCard';
import AddPetCard from '@/components/features/AddPetCard';

type Pet = { id: number; type: string; name: string; photoUrl: string | null };

type PetListProps = {
  pets: Pet[];
  isOwner: boolean;
};

export default function PetList({ pets, isOwner }: PetListProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {pets.map((pet) => (
        <PetCard key={pet.id} id={pet.id} type={pet.type} name={pet.name} photoUrl={pet.photoUrl} />
      ))}
      {isOwner && <AddPetCard />}
    </div>
  );
}

// comme ca on peut reutiliser sur un profil de user si on est pas proprietaire la carte addpet existe pas