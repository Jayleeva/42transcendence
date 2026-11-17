'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const sizes = {
  md: 'max-w-lg',
  lg: 'max-w-4xl',
};

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: keyof typeof sizes;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, title, size = 'md', children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  // ce composant est contrôlé par le parent : c’est lui qui possède l’état open et qui passe onClose.
  // Le useEffect ouvre ou ferme le <dialog> quand open change
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={`m-auto w-[calc(100%-2rem)] ${sizes[size]} rounded-2xl bg-white text-black shadow-xl backdrop:bg-black/60`}
    >
      <div className="relative p-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-3 top-3 cursor-pointer rounded-full p-1 hover:bg-slate-100"
        >
          <X size={20} />
        </button>
        <h2 className="mb-4 pr-8 font-display text-3xl font-bold">{title}</h2>
        {children}
      </div>
    </dialog>
  );
}