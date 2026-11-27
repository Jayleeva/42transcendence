'use client';

import { useState } from 'react';
import { UserMinus } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Avatar from '@/components/ui/Avatar';
import SearchBar from '@/components/ui/SearchBar';

// structure d'un ami
export type Friend = {
  id: string | number;
  username: string;
  avatarUrl?: string | null;
};

// les props pour le composant 
type FriendsModalProps = {
  open: boolean;
  onClose: () => void; // fonction pour fermer modal
  friends: Friend[]; // le tableau qui va contenir tous les amis
  onRemove: (friend: Friend) => void; // fonction pour retirer un friend
};

export default function FriendsModal({ open, onClose, friends, onRemove }: FriendsModalProps) {
  const [query, setQuery] = useState('');

  // on clean d'abord puis on filtre
  const search = query.trim().toLowerCase();
  const filtered = search
    ? friends.filter((f) => f.username.toLowerCase().includes(search))
    : friends;

  // on vide la query avant de fermer 
  const handleClose = () => {
    setQuery('');
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Mes amis">
      <SearchBar
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        placeholder="Rechercher un ami..."
        aria-label="Rechercher un ami"
      />

      <ul className="mt-4 max-h-80 overflow-y-auto">
        {filtered.length > 0 ? (
          filtered.map((friend) => (
            <li
              key={friend.id}
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-brand/10"
            >
              <Avatar size="sm" src={friend.avatarUrl} alt={friend.username}>
                {friend.username.charAt(0).toUpperCase()}
              </Avatar>
              <span className="flex-1 truncate font-medium">{friend.username}</span>
              <button
                type="button"
                onClick={() => onRemove(friend)}
                aria-label={`Supprimer ${friend.username} de mes amis`}
                className="shrink-0 cursor-pointer rounded-full p-2 text-red-600 hover:bg-white"
              >
                <UserMinus size={20} />
              </button>
            </li>
          ))
        ) : (
          <li className="px-3 py-2 text-sm text-slate-500">Aucun résultat</li>
        )}
      </ul>
    </Modal>
  );
}