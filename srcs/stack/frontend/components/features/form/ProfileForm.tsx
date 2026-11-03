// app/profile/profile-form.tsx
'use client';

import { useState } from 'react';

// On définit la structure des données attendues
interface UserData {
  name: string;
  email: string;
  bio?: string;
}

export default function ProfileForm({ initialData }: { initialData: UserData }) {
  // On auto-remplit le state directement avec les données reçues du serveur
  const [name, setName] = useState(initialData.name);
  const [bio, setBio] = useState(initialData.bio || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour mettre à jour le profil (ex: via une Server Action ou API)
    console.log({ name, bio });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <div>
        <label className="block mb-1">Email (Non modifiable)</label>
        <input 
          type="email" 
          value={initialData.email} 
          disabled 
          className="bg-gray-100 p-2 border rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1">Nom complet</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="p-2 border rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1">Biographie</label>
        <textarea 
          value={bio} 
          onChange={(e) => setBio(e.target.value)} 
          className="p-2 border rounded w-full"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Sauvegarder les modifications
      </button>
    </form>
  );
}
