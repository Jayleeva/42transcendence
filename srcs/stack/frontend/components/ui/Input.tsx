// test champs a remplir 

import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function Input({ label, id, name, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        className={`rounded-lg border border-slate-300 px-4 py-3 focus:border-black focus:outline-none ${className}`}
        name={name}
        {...props}
      />
    </div>
  );
}

/* 
tout ce qu’un <input> accepte, plus un label en texte. 
Pas de ? donc label est obligatoire.

On extrait label et id (utilisés à deux endroits) et className 
Le reste (name, type, placeholder...) part dans props

Un composant doit renvoyer un seul élément racine
Cette div regroupe le label et le champ, empilés avec un petit espace.

htmlFor est le nom du for du HTML dans JSX
Il relie le label au champ qui a le même id : cliquer sur « Email » active le champ

focus : qd le champs est actif 

*/