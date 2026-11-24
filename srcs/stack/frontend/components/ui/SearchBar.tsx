// barre de recherche pour la page feed

import { Search } from 'lucide-react';
import { InputHTMLAttributes } from 'react';

export default function SearchBar({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full bg-slate-100 px-5 py-3 ${className}`}
    >
      <Search size={18} className="shrink-0 text-slate-500" aria-hidden="true" />
      <input type="search" className="w-full bg-transparent focus:outline-none" {...props} />
    </div>
  );
}