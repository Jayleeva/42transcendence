// test champs a remplir 

import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function Input({ label, id, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        className={`rounded-lg border border-slate-300 px-4 py-3 focus:border-black focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
}