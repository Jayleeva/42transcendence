'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import SearchBar from '@/components/ui/SearchBar';

// données de test, à remplacer par les résultats du backend
const fakeResults = [
  { id: 'u1', kind: 'user', name: 'Melo', href: '/users/1' },
  { id: 'u2', kind: 'user', name: 'Marjo', href: '/users/2' },
  { id: 'p1', kind: 'pet', name: 'Milo', href: '/pet/12' },
  { id: 'p2', kind: 'pet', name: 'Pepito', href: '/pet/13' },
];

export default function SearchModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  const search = query.trim().toLowerCase();
  const results = search
    ? fakeResults.filter((r) => r.name.toLowerCase().includes(search))
    : [];

  return (
    <>
    {/* Bouton declebcheur */}
      <button
        type="button"
        onClick={open}
        aria-label="Rechercher"
        className="cursor-pointer hover:opacity-70"
      >
        <Search size={32} />
      </button>

      {/* Fenetre modal pop-up*/}
      <dialog
        ref={dialogRef}
        aria-label="Recherche"
        onClose={() => setQuery('')}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="mx-auto mt-24 w-[calc(100%-2rem)] max-w-lg rounded-2xl bg-white text-black shadow-xl backdrop:bg-black/50"
      >
        <div className="p-4">
          <SearchBar
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un étudiant ou un animal..."
            aria-label="Rechercher un étudiant ou un animal"
          />

          {search && (
            <ul className="mt-4 max-h-80 overflow-y-auto">
              {results.length > 0 ? (
                results.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={r.href}
                      onClick={close}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-brand/10"
                    >
                      <Avatar size="sm" alt={r.name}>
                        {r.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <span className="flex-1 truncate font-medium">{r.name}</span>
                      <span className="shrink-0 text-xs text-slate-500">
                        {r.kind === 'user' ? 'Étudiant' : 'Animal'}
                      </span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-sm text-slate-500">Aucun résultat</li>
              )}
            </ul>
          )}
        </div>
      </dialog>
    </>
  );
}

{/* 
    useRef (dialogRef). 
    Crée un lien direct vers la balise HTML <dialog> pour pouvoir lui donner l'ordre de s'ouvrir (showModal()) ou de se fermer (close()).

    useState (query). 
    Crée une variable en mémoire qui retient ce que l'utilisateur tape dans la barre de recherche. 
    À chaque lettre tapée, setQuery met à jour cette variable et force le composant à se rafraîchir.

    Le filtrage (search et results). 
    Le code nettoie le texte tapé (trim() enlève les espaces inutiles, toLowerCase() met tout en minuscules).
    S'il y a du texte, il filtre le tableau fakeResults pour ne garder que les éléments dont le nom contient la recherche.

    C'est la balise <dialog> qui gere automatiquement l'affichage de la fenetre modale
    
    Réinitialisation (onClose). 
    Dès que la fenêtre se ferme, setQuery('') vide le champ de recherche pour la prochaine fois.

    Fermeture au clic extérieur (onClick). La condition if (e.target === e.currentTarget) close() vérifie si user a cliqué autour de la boîte (le backdrop grisé). 
    Si oui, la fenêtre se ferme ; s'il clique à l'intérieur sur la barre de recherche, elle reste ouverte.

    A linterieur il y a la barre de recherche (notre composant SearchBar) et la liste des résultats .
    C'est un affichafe conditionnel, ca affiche uniauement si qqchose est tapé

    Boucle sur les résultats (results.map(...)). Si des correspondances existent, le code génère un lien (<Link>) 
    pour chacune avec un avatar (la première lettre du nom en majuscule), le nom complet, 
    et un badge indiquant s'il s'agit d'un 'Étudiant' ou d'un 'Animal'. 
    Cliquer sur un résultat ferme la modale (onClick={close}) et redirige vers la page correspondante.

*/}
