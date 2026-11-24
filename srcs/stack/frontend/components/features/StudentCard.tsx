// Student Card

import Avatar from '@/components/ui/Avatar';
import Link from 'next/dist/client/link';
import { Users, Mail } from 'lucide-react';


type StudentCardProps = {
  id: string | number;
  username: string;
  photoUrl?: string | null;
  bio?: string | null;
  nfriends: number | 0;
  isOwner?: boolean;
};

export default function StudentCard({ id, username, photoUrl, bio, nfriends, isOwner = false }: StudentCardProps) {
  const buttonStyle =
    'inline-flex items-center gap-1.5 w-max rounded-xl px-4 py-1 font-normal text-xs transition-colors bg-brand text-white hover:opacity-90';
  
  return (
<div className="flex items-center gap-6 w-full max-w-2xl bg-white border-brand border-3 rounded-2xl p-6 shadow-sm">
  
  <div className="w-1/4 flex justify-center shrink-0">
   <Avatar src={photoUrl ?? undefined} alt={username} />
  </div>

  <div className="flex-1 min-w-0 flex flex-col gap-2">
    
    <h2 className="text-xl font-bold text-slate-800">{username}</h2>

    <p className="text-sm font-medium text-slate-500">👥 {nfriends} amis </p>
 
      <p className="text-sm text-slate-600 break-words whitespace-pre-wrap">
      {bio}
    </p>
    
    {/* Le conditionnel est ici */ }
    <div className="mt-2 flex flex-wrap items-center gap-2">
          {isOwner ? (
            <Link href="/profile-student/settings" className={buttonStyle}>
              Modifier le profil
            </Link>
          ) : (
            <>
              <Link href="/notifications" className={buttonStyle}>
                <Users className="w-3.5 h-3.5" />
                <span>Ajouter en ami</span>
              </Link>
              <Link href="/messages" className={buttonStyle}>
                <Mail className="w-3.5 h-3.5" />
                <span>Envoyer un message</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}  

{/* 
  changer les 2 href avec le chemin correct pour les actions
  add friends ? comment on fait ( pour l'instant je renvoie sur les notif pour pas d'erreur 404)
  mais pour les friend changer avec un boutton on click pour appel API ? 
  href={`/friends/add/${id}`}  ??? on a pas de dossier ni page for now 
  
  Envoyer un message : pour l'instant renvoie sur le lien de la messagerie, mais on peut faire un lien direct vers le chat avec l'utilisateur si on veut  
  Mais pareil, creer une action qui creer une conv avec le user et renvoie sur cette page ? 
*/}
