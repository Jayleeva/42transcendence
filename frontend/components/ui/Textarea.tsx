// pour la bio ( un grand champs de texte ) pour les users et les pets

import { TextareaHTMLAttributes } from 'react';

type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
};

export default function Textarea({ id, name, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <textarea
        id={id}
        rows={4}
        className={`rounded-lg border border-slate-300 px-4 py-3 focus:border-black focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
}