'use client';

import { useState } from 'react';
import Avatar from '@/components/ui/Avatar';
import MiniButton from '@/components/ui/MiniButton';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import { petTypes } from '@/lib/petTypes';

export default function PetForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Photo validée pour le formulaire principal
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Sélection temporaire à l'intérieur de la modale
  const [tempFile, setTempFile] = useState<File | null>(null);
  const [tempPreview, setTempPreview] = useState<string | undefined>(undefined);

  // 1. Choix du fichier dans la modale
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (tempPreview) URL.revokeObjectURL(tempPreview);

    if (file) {
      setTempFile(file);
      setTempPreview(URL.createObjectURL(file));
    } else {
      setTempFile(null);
      setTempPreview(undefined);
    }
  };

  // 2. Appliquer la photo choisie à l'avatar du formulaire
  const handleConfirmPhoto = () => {
    if (tempPreview && tempFile) {
      if (avatarUrl) URL.revokeObjectURL(avatarUrl);
      setAvatarUrl(tempPreview);
      setAvatarFile(tempFile);
    }
    setIsModalOpen(false);
    setTempFile(null);
    setTempPreview(undefined);
  };

  // 3. Fermer la modale sans sauvegarder le changement
  const handleCloseModal = () => {
    if (tempPreview) URL.revokeObjectURL(tempPreview);
    setIsModalOpen(false);
    setTempFile(null);
    setTempPreview(undefined);
  };

  // 4. Soumission globale du formulaire (Photo + Infos + Description)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    // Envoi vers ton API / Server Action
    console.log('Données animal prêtes :', Object.fromEntries(formData));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Section Photo */}
        {/* Section Photo visu : est ce qu on met items-center pour centrer avatar ??*/} 
        <section className="flex flex-col items-start gap-4">
          <h2 className="font-bold">Photo de l'animal</h2>
          <Avatar src={avatarUrl} />
          <MiniButton
            type="button"
            variant="outline"
            onClick={() => setIsModalOpen(true)}
          >
            Ajouter / modifier
          </MiniButton>
        </section>

        {/* Section Informations générales */}
        <section className="flex flex-col gap-4">
          <h2 className="font-bold">Informations générales</h2>
          <Input id="name" name="name" type="text" label="Nom" required />
          <Select
            id="type"
            name="type"
            label="Type d'animal"
            placeholder="Sélectionnez un type d'animal"
            options={petTypes}
            required
          />
          <Input id="race" name="race" type="text" label="Race de l'animal" />
          <Input id="birth" name="birth" type="date" label="Date de naissance" />
        </section>

        {/* Section Description */}
        <section className="flex flex-col gap-4">
          <h2 className="font-bold">Description / informations</h2>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Écrivez quelque chose à propos de votre animal"
            maxLength={300}
          />
        </section>

        {/* est ce qu on centre ici aussi ? 
         className="flex items-center justify-center gap-3"
         */}
        <div >
          <MiniButton type="submit" variant="outline">
            Ajouter l'animal
          </MiniButton>
        </div>
      </form>

      {/* Modale d'importation de photo (en dehors du <form>) */}
      <Modal 
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Modifier la photo de profil"
        size="md"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar src={tempPreview || avatarUrl} />

            <label className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
              Choisir un fichier
              <input
                id="user-photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
              <span className="truncate text-sm italic text-slate-500">
                {tempFile ? tempFile.name : 'Aucun fichier choisi'}
              </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <MiniButton
              type="button"
              onClick={handleConfirmPhoto}
              variant="outline"
              disabled={!tempFile}
            >
              Appliquer la photo
            </MiniButton>
          </div>
        </div>
      </Modal>
    </>
  );
}