// Pet Card 

import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import { getPetTypeLabel } from '@/lib/petTypes';

export type PetCardProps = {
  id: string | number;
  name: string;
  type: string;
  race?: string | null;
  dateOfBirth?: string | null;
  photoUrl?: string | null;
  info?: string | null;
  isOwner?: boolean;
};

export default function PetCard({
  id,
  type,
  race,
  dateOfBirth,
  photoUrl,
  info,
  isOwner = true,
}: PetCardProps) {
  const typeLabel = getPetTypeLabel(type);

  return (
 <div className="flex items-center gap-6 w-full max-w-2xl bg-brand-secondary rounded-2xl p-6 shadow-sm">
  <div className="w-1/4 flex justify-center shrink-0">
        <Avatar src={photoUrl} alt={typeLabel} />
      </div>

      <div className="flex flex-1 flex-col gap-2 text-sm text-slate-600">
        <p className="font-semibold text-black">{typeLabel}</p>
        {race && <p><span className="font-bold text-black">Race :</span> {race}</p>}
        {dateOfBirth && <p><span className="font-bold text-black">Date de naissance :</span> {dateOfBirth}</p>}
        {info && <p><span className="font-bold text-black">Info :</span> {info}</p>}
        {isOwner && (
          <Link
            href={`/pet/${id}/edit`}
            className="w-max rounded-xl px-4 py-1 font-normal text-xs transition-colors bg-brand text-white mt-2">
            Modifier le profil
          </Link>
        )}
      </div>
    </div>
  );
}

{/* 
    
 import Avatar from '@/components/ui/Avatar';
import MiniButton from '../ui/MiniButton';

type PetCardProps = {
  id: string | number;
  type: string; // mais c'est pas une string on a mis un drop down ? 
  race: string;
  photoUrl?: string | null;
  info?: string | null;
};

export default function PetCard({ id, type, race, photoUrl, info }: PetCardProps) {
  return (
<div className="flex items-center gap-6 w-full max-w-2xl bg-brand-secondary rounded-2xl p-6 shadow-sm">
  
  <div className="w-1/4 flex justify-center shrink-0">
   <Avatar/>
  </div>

  <div className="flex-1 flex flex-col gap-2">
    <p className="font-bold" >{type}</p>
    <p className="font-bold" >Race: {race}  </p>
    <p>Info: {info} </p>
    <div className="mt-2">
      <MiniButton type="button" variant="outline">Modifier le profil</MiniButton>
    </div>
  </div>
</div>
  );
}      
    */}