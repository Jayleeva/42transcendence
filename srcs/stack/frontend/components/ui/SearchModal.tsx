'use client';

import React, { useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import SearchBar from '@/components/ui/SearchBar';
import { callApiWithCookie } from '@/utils/functions/callApiWithCookie';

// 1. Retrait du mot-clé "async" ici (obligatoire pour un 'use client')
export default function SearchModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();

  const open = () => dialogRef.current?.showModal();
  const close = () => {
    dialogRef.current?.close();
    setQuery('');
    setResults([]);
  };

  const search = query.trim().toLowerCase();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // 2. On utilise directement "value" (et non "search" qui a un train de retard)
    const cleanSearch = value.trim().toLowerCase();

    if (!cleanSearch) {
      setResults([]);
      return;
    }

    startTransition(async () => {
      try {
        const data = await callApiWithCookie('/api/users', 'GET');

        // 3. On vérifie que "data" est bien un tableau avant de faire .filter()
        if (Array.isArray(data)) {
          const filtered = data.filter((r: any) =>
            r.username?.toLowerCase().includes(cleanSearch)
          );
          setResults(filtered);
        } else {
          console.error('Format inattendu reçu du backend :', data);
          setResults([]);
        }
      } catch (error) {
        console.error('Erreur lors de la recherche :', error);
        setResults([]);
      }
    });
  };

  return (
    <>
      {/* Bouton déclencheur */}
      <button
        type="button"
        onClick={open}
        aria-label="Rechercher"
        className="cursor-pointer hover:opacity-70"
      >
        <Search size={32} />
      </button>

      {/* Fenêtre modal pop-up */}
      <dialog
        ref={dialogRef}
        aria-label="Recherche"
        onClose={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="mx-auto mt-24 w-[calc(100%-2rem)] max-w-lg rounded-2xl bg-white text-black shadow-xl backdrop:bg-black/50"
      >
        <div className="p-4">
          <SearchBar
            value={query}
            onChange={handleSearch}
            placeholder="Rechercher un utilisateur..."
            aria-label="Rechercher un utilisateur"
          />

          {isPending && (
            <p className="mt-2 px-3 text-sm text-slate-500">Chargement...</p>
          )}

          {search && !isPending && (
            <ul className="mt-4 max-h-80 overflow-y-auto">
              {results.length > 0 ? (
                results.map((r) => {
                  // 4. Adaptation aux vraies propriétés renvoyées par /api/users
                  const displayName = r.username || r.name || 'Utilisateur';
                  const userHref = r.href || `/users/${r.id}`;

                  return (
                    <li key={r.id}>
                      <Link
                        href={userHref}
                        onClick={close}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-brand/10"
                      >
                        <Avatar size="sm" alt={displayName}>
                          {displayName.charAt(0).toUpperCase()}
                        </Avatar>
                        <span className="flex-1 truncate font-medium">
                          {displayName}
                        </span>
                        <span className="shrink-0 text-xs text-slate-500">
                          {r.kind === 'pet' ? 'Animal' : 'Utilisateur'}
                        </span>
                      </Link>
                    </li>
                  );
                })
              ) : (
                <li className="px-3 py-2 text-sm text-slate-500">
                  Aucun résultat
                </li>
              )}
            </ul>
          )}
        </div>
      </dialog>
    </>
  );
}
