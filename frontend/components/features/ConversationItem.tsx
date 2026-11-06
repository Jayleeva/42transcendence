// les liste de noms empiles sur une colonne

import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';

type ConversationItemProps = {
  id: string | number;
  username: string;
  photoUrl?: string | null;
  time?: string;
};

export default function ConversationItem({ id, username, photoUrl, time }: ConversationItemProps) {
  return (
    <Link
      href={`/messages/${id}`}
      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-brand/10 focus-visible:outline-2 focus-visible:outline-brand"
    >
      <Avatar src={photoUrl} alt={username} size="sm">
        {username.charAt(0).toUpperCase()}
      </Avatar>
      <span className="flex-1 truncate font-medium">{username}</span>
      {time && <span className="shrink-0 text-xs text-slate-500">{time}</span>}
    </Link>
  );
}

{/* 
    Le composant ici est un link qui renvoi via id dynamique : href={`/messages/${id}`}

    si jamais pas de photo :  {username.charAt(0).toUpperCase()} pour la premiere lettre ? 
    A garder ou alors juste le "?" comme els autres pages

    Pour le user name, utiliser flex-1 pour prendre tout l'espace dispo 
    Va pousser l'heure tout a doite

    pour l heure affichage conditionnel avec && 
    shrink-0 pour pas que l'heure se deforme 

    -> Est ce qu'on ajoute un indicateur de message non lu ? 
    -> UN petit rond bleu a droite de l'heure ?
    
    */}