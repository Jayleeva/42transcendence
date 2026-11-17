"use client"

import { useState } from 'react';
import Textarea from '@/components/ui/Textarea';
import MiniButton from '@/components/ui/MiniButton';
import { callApiWithCookie } from '@/utils/functions/callApiWithCookie';

interface BioFormProps {
  initialBio?: string | null;
}

export default function BioForm({ initialBio }: BioFormProps) {
  const [bio, setBio] = useState(initialBio || "");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const response = await callApiWithCookie(
      '/api/users/me',
      'PATCH',
      JSON.stringify({ bio })
    );

    setIsLoading(false);

    if (response && !response.error) {
      alert("Biographie mise à jour !");
    } else {
      alert("Erreur lors de la mise à jour de la biographie.");
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <section className="flex flex-col gap-4">
        <h2 className="font-bold">À propos de moi</h2>
        <div className="flex flex-col gap-2">
          <Textarea
            id="bio"
            name="bio"
            placeholder="Écrivez quelque chose à propos de vous..."
            maxLength={300}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <div>
            <MiniButton type="submit" variant="outline" disabled={isLoading}>
              {isLoading ? "Enregistrement..." : "Valider les modifications"}
            </MiniButton>
          </div>
        </div>
      </section>
    </form>
  );
}
