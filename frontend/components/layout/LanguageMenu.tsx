'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronUp } from 'lucide-react';

// check comment faire pour la trad du site 
const languages = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

export default function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(languages[0]);
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

  const itemClass = 'block w-full px-5 py-2 text-left text-sm hover:bg-brand/10';

  return (
    <div ref={ref} className="relative flex">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Choix de la langue"
        aria-expanded={open}
        className="flex cursor-pointer items-center gap-1 hover:underline"
      >
        {current.flag} {current.label}
        <ChevronUp size={14} aria-hidden="true" />
      </button>

      {open && (
        <ul className="absolute bottom-full left-1/2 z-50 mb-3 w-35 -translate-x-1/2 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 text-black shadow-lg">
        {languages.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                onClick={() => {
                  setCurrent(lang);
                  setOpen(false);
                }}
                className={itemClass}
              >
                {lang.flag} {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

{/* 
  Quand on fera le modul trad :
    librairie next-intl ?
    Avoir un fichier de textes pour chaque langue
    utiliser l'array languqge ? 
    A voir comment on fait ca 
  
*/}