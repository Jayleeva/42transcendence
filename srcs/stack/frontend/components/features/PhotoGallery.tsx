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

export default function PhotoGallery({ photos, petName, isOwner = true }: PhotoGalleryProps) {
    const [selected, setSelected] = useState<Photo | null>(null);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (previewUrl) URL.revokeObjectURL(previewUrl); // Libère la mémoire précédente

    if (file) {
        setSelectedFileName(file.name);
        setPreviewUrl(URL.createObjectURL(file));
    } else {
        setSelectedFileName(null);
        setPreviewUrl(null);
    }
};

const handleCloseUpload = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setUploadOpen(false);
    setSelectedFileName(null);
    setPreviewUrl(null);
};


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
        <Modal open={uploadOpen} onClose={handleCloseUpload} title="Ajouter une photo">
            <form className="flex items-center flex-col gap-4">
                {/* Miniature affichée uniquement quand une image est choisie */}
                {previewUrl && (
                <div className="flex justify-center">
                    <img
                    src={previewUrl}
                    alt="Aperçu de la photo sélectionnée"
                    className="h-32 w-32 rounded-xl border border-slate-200 object-cover shadow-sm"
                    />
                </div>
                )}

                 {/* Bouton et nom du fichier l'un en dessous de l'autre */}
                <div className="flex w-full flex-col items-center gap-2">
                <label
                    htmlFor="photo-upload"
                    className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50"
                >
                    Choisir un fichier
                </label>

                <input
                    id="photo-upload"
                    type="file"
                    name="photo"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="sr-only"
                />

                {/* truncate évite que les noms de fichiers très longs ne cassent la mise en page */}
                <span className="truncate text-sm italic text-slate-500">
                    {selectedFileName || 'Aucun fichier choisi'}
                </span>
                </div>

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

