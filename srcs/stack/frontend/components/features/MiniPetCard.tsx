// Mini Pet Card juste pour profil user 

// toute la carte dvient un link. Comme ca pas beoins de bouton, de Onclic etc 

import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';

type PetCardProps = {
  id: string | number;
  name: string;
  photoUrl?: string | null;
};

export default function MiniPetCard({ id, name, photoUrl }: PetCardProps) {
  return (
    <Link
      href={`/pet/${id}`}
      className="flex aspect-[2/3] w-40 flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:bg-brand/10"
    >
      <Avatar src={photoUrl ?? undefined} alt={name} />
      <span className="line-clamp-2 break-words text-center font-semibold">
        {name}
      </span>
    </Link>
  );
}


// line-clamp-2 ( sur 2 lignes ) pour le nom du pet, si c'est trop long ca coupe et met sur 2 ligen 
// break-word va couper le mot pour le mettre a la ligen 

{/* 
    MINI PET CARD
    aspect-[2/3]  pour format carte a jouer
    gap-4 petite marge entre chaque element
    p-4 padding interne a la carte
    rounded-2xl arrondi des coins    
    border, background ...
    trnsition, pour que les ombres etc ca soir un peu plus fluide
    hover:-translate-y-1 : Au survol de la souris, déplace le composant de 4px vers le haut (effet de lévitation). 
    Le signe - indique un déplacement négatif sur l'axe Y.
*/}