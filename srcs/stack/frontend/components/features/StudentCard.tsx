// Student Card

import Avatar from '@/components/ui/Avatar';
import MiniButton from '../ui/MiniButton';
import Link from 'next/dist/client/link';

type StudentCardProps = {
  id: string | number;
  username: string;
  photoUrl?: string | null;
  bio?: string | null;
  nfriends: number | 0;
};

export default function StudentCard({ id, username, photoUrl, bio, nfriends }: StudentCardProps) {
  //if (!bio)
  //  bio = "Ceci est une bio test ahahah faudra remplacer par userData.bio quand ça sera fonctionnel lalala";
  return (
<div className="flex items-center gap-6 w-full max-w-2xl bg-brand-secondary rounded-2xl p-6 shadow-sm">
  
  <div className="w-1/4 flex justify-center shrink-0">
   <Avatar src={photoUrl ?? undefined} alt={username} />
  </div>

  <div className="flex-1 flex flex-col gap-2">
    
    <h2 className="text-xl font-bold text-slate-800">{username}</h2>

    <p className="text-sm font-medium text-slate-500">👥 {nfriends} amis</p>
 
      <p className="text-sm text-slate-600">
      {bio}
    </p>
    
    <div className="mt-2">
        <Link
            href={`/profile-student/settings`}
            className="w-max rounded-xl px-4 py-1 font-normal text-xs transition-colors bg-brand text-white">
            Modifier le profil
        </Link>
    </div>
  </div>
</div>
  );
}   


{/*
option 1 : fond colore
className="flex items-center gap-6 w-full max-w-2xl bg-brand-secondary rounded-2xl p-6 shadow-sm"

option 2 : fond blanc et bordure couleur
className="flex items-center gap-6 w-full max-w-2xl bg-white border-brand border-3 rounded-2xl p-6 shadow-sm"
    */}