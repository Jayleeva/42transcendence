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