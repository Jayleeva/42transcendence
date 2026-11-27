// a modif later juste pour test nav bar
'use client';

import { useState } from 'react';
import FriendsModal, { Friend } from '@/components/ui/FriendsModal';

// fake data juste poiur le testing 
const MOCK_FRIENDS: Friend[] = [
  { id: 1, username: 'Alice', avatarUrl: null },
  { id: 2, username: 'Bob', avatarUrl: null },
  { id: 3, username: 'Charlotte', avatarUrl: null },
  { id: 4, username: 'Dylan', avatarUrl: null },
  { id: 5, username: 'Emma', avatarUrl: null },
];

export default function TestFriendsPage() {
  const [open, setOpen] = useState(false);
  const [friends, setFriends] = useState<Friend[]>(MOCK_FRIENDS);

  const handleRemove = (friend: Friend) => {
    setFriends((prev) => prev.filter((f) => f.id !== friend.id));
  };

  return (
    <main className="p-8">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-black underline"
      >
        Mes amis
      </button>

      <button
        type="button"
        onClick={() => setFriends(MOCK_FRIENDS)}
        className="ml-4 rounded-lg border px-4 py-2"
      >
        Réinitialiser
      </button>

      <FriendsModal
        open={open}
        onClose={() => setOpen(false)}
        friends={friends}
        onRemove={handleRemove}
      />
    </main>
  );
}