'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import MiniButton from '@/components/ui/MiniButton';

export type Photo = {
  id: string | number;
  url: string;
};

type PhotoGalleryProps = {
  photos: Photo[];
  petName: string;
  isOwner?: boolean;
};

export default function PhotoGallery({ photos, petName, isOwner = false }: PhotoGalleryProps) {
  const [selected, setSelected] = useState<Photo | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  if (photos.length === 0 && !isOwner) {
    return <p className="text-slate-500">Aucune photo pour le moment.</p>;
  }

  return (
    <>
    {/* 2 colonne sur mobile, 4 sur ecran*/}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* chaque photo est dans un bouton carre*/}
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setSelected(photo)}
            aria-label={`Agrandir la photo ${i + 1}`}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-slate-200 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-brand"
          >
            <Image
              src={photo.url}
              alt={`Photo ${i + 1} de ${petName}`}
              fill
              sizes="(min-width: 640px) 160px, 50vw"
              className="object-cover"
            />
          </button>
        ))}

        {isOwner && (
          <button
            type="button"
            onClick={() => setUploadOpen(true)}
            aria-label="Ajouter une photo"
            className="flex aspect-square cursor-pointer items-center justify-center rounded-lg bg-slate-200 text-slate-500 transition-colors hover:bg-slate-300 focus-visible:outline-2 focus-visible:outline-brand"
          >
            <Plus size={32} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* photo agrandie */}
      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={`Photo de ${petName}`}
        size="lg"
      >
        {selected && (
            // conteneur de 70% de l ecran
          <div className="relative h-[70vh] w-full">
            <Image
              src={selected.url}
              alt={`Photo de ${petName}`}
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-contain"
            />
          </div>
        )}
      </Modal>

      {/* upload d'une nouvelle photo */}
      <Modal open={uploadOpen} onClose={() => setUploadOpen(false)} title="Ajouter une photo">
        <form className="flex flex-col gap-4">
          <input type="file" name="photo" accept="image/*" required />
          <div>
            <MiniButton type="submit" variant="outline">
              Ajouter
            </MiniButton>
          </div>
        </form>
      </Modal>
    </>
  );
}

{/* 
    
*/}