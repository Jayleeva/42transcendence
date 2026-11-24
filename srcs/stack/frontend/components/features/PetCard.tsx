// Pet Card 

import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import { getPetTypeLabel } from '@/lib/petTypes';

type PetCardProps = {
  id: string | number;
  type: string;
  race?: string | null;
  birthDate?: string | null;
  photoUrl?: string | null;
  bio?: string | null;
  isOwner?: boolean;
  ownerID?: string | null;
  ownerUsername?: string | null;
};

export default function PetCard({
  id,
  type,
  race,
  birthDate,
  photoUrl,
  bio,
  isOwner = true,
  ownerID,
  ownerUsername,
}: PetCardProps) {
  const typeLabel = getPetTypeLabel(type);
  const date = birthDate?.split('T')[0];
  const ownerProfileLink = `/users/${ownerID}`;
  return (
 <div className="flex items-center gap-6 w-full max-w-2xl bg-white border-brand border-3 rounded-2xl p-6 shadow-sm">
  <div className="w-1/4 flex justify-center shrink-0">
        <Avatar src={photoUrl} alt={typeLabel} />
      </div>

      <div className="flex flex-1 flex-col gap-2 text-sm text-slate-600">
        <p className="font-semibold text-black">{typeLabel}</p>
        {race && <p><span className="font-bold text-black">Race :</span> {race}</p>}
        {birthDate && <p><span className="font-bold text-black">Date de naissance :</span> {date}</p>}
        {bio && <p><span className="font-bold text-black">Bio :</span> {bio}</p>}
        {ownerID && <p><span className="font-bold text-black">Profil du propriétaire : </span>
          <Link href={ownerProfileLink} className="underline">
            {ownerUsername}
          </Link>
        </p>}
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