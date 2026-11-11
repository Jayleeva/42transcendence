'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { CircleUserRound } from 'lucide-react';

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // ferme le menu si on clique ailleurs ou si on appuie sur Échap
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const handleLogout = () => {
    setOpen(false);
    // Cynthia : appeler le backend pour fermer la session, puis rediriger vers /login ?
    // a placer ici 
  };

  const itemClass = 'block w-full px-4 py-2 text-left text-sm hover:bg-brand/10';

  return (
    <div ref={ref} className="relative flex">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu du compte"
        aria-expanded={open}
        className="cursor-pointer hover:opacity-70"
      >
        <CircleUserRound size={32} />
      </button>

      {open && (
        <ul className="absolute left-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 text-black shadow-lg">
          <li>
            <Link href="/profile-student" onClick={() => setOpen(false)} className={itemClass}>
              Mon profil
            </Link>
          </li>
          <li>
            <Link href="/profile-student/settings" onClick={() => setOpen(false)} className={itemClass}>
              Paramètres
            </Link>
          </li>
          <li className="border-t border-slate-200">
            <button type="button" onClick={handleLogout} className={`${itemClass} cursor-pointer`}>
              Déconnexion
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

{/* 
    const [open, setOpen] = useState(false); : Crée une variable d'état booléenne (true ou false). 
    Par défaut, le menu est fermé (false). Appeler setOpen demande à React de mettre à jour l'affichage à l'écran.

    const ref = useRef<HTMLDivElement>(null);  
    Crée une référence (un pointeur) qui sera attachée à la balise <div> principale du menu (<div ref={ref}>). 
    Cela permet au code de savoir exactement quelle zone de l'écran appartient au menu.

    handleClick : Vérifie si l'utilisateur a cliqué en dehors de la zone pointée par ref (!ref.current.contains(...)). 
    Si c'est le cas, il ferme le menu (setOpen(false)).
    Same pour Handle key avec la touche echap du clavier

    Cleaning avec nettoyage (return () => { ... })
    Il faut retirer les ecoutes pour eviter bug et ralentissements 

    onClick={() => setOpen((o) => !o)}
    Inverse l'état actuel du menu à chaque clic. Si open est false, il passe à true, et inversement.

    La liste <ul> ne s'affiche que si open est vrai (true) 

    Fermeture au clic sur un lien : 
    Chaque <Link> possède onClick={() => setOpen(false)} pour que le menu se referme proprement 
    dès que l'utilisateur navigue vers son profil ou ses paramètres.
*/}