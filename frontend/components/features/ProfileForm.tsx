'use client';

import { useState } from 'react';
import Avatar from '@/components/ui/Avatar';
import MiniButton from '@/components/ui/MiniButton';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Modal from '@/components/ui/Modal';

export default function ProfileForm({ initialAvatar }: { initialAvatar?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Photo validée pour le formulaire principal
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(initialAvatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Sélection temporaire à l'intérieur de la modale
  const [tempFile, setTempFile] = useState<File | null>(null);
  const [tempPreview, setTempPreview] = useState<string | undefined>(undefined);

  // 1. Choix du fichier dans la modale
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTempFile(file);
    setTempPreview(URL.createObjectURL(file));
  };

  // 2. Validation du choix dans la modale (ne soumet PAS le formulaire)
  const handleConfirmPhoto = () => {
    if (tempPreview && tempFile) {
      setAvatarUrl(tempPreview);
      setAvatarFile(tempFile);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTempFile(null);
    setTempPreview(undefined);
  };

  // 3. Soumission globale (Photo + Bio + Infos générales)
  const handleSubmitProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // FormData récupère automatiquement tous les inputs ayant un attribut "name"
    const formData = new FormData(e.currentTarget);
    
    // On ajoute le fichier image sélectionné s'il y en a un
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    // Tu peux maintenant envoyer `formData` à ton backend / Server Action
    console.log('Données prêtes à être envoyées :', Object.fromEntries(formData));
  };

  return (
    <>
      <form onSubmit={handleSubmitProfile} className="flex flex-col gap-8">
        {/* Section Photo */}
        <section className="flex flex-col items-start gap-4">
          <h2 className="font-bold">Photo de profil</h2>
          <Avatar src={avatarUrl} />
          <MiniButton
            type="button"
            variant="outline"
            onClick={() => setIsModalOpen(true)}
          >
            Ajouter / modifier
          </MiniButton>
        </section>

        {/* Section Bio */}
        <section className="flex flex-col gap-4">
          <h2 className="font-bold">À propos de moi</h2>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Écrivez quelque chose à propos de vous..."
            maxLength={300}
          />
        </section>

        {/* Section Informations générales */}
        <section className="flex flex-col gap-4">
          <h2 className="font-bold">Informations générales</h2>
          <Input id="firstname" name="firstname" type="text" label="Prénom" />
          <Input id="lastname" name="lastname" type="text" label="Nom" />
          <Input id="username" name="username" type="text" label="Pseudo" />
          <Input id="birth" name="birth" type="date" label="Date de naissance" />
          <Input id="email" name="email" type="email" label="Email" />
        </section>

        <div>
          <MiniButton type="submit" variant="outline">
            Valider les modifications
          </MiniButton>
        </div>
      </form>

      {/* Modale placée EN DEHORS du <form> pour éviter les formulaires imbriqués */}
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

            {/* type="button" crucial ici pour ne pas déclencher le submit du formulaire parent */}
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