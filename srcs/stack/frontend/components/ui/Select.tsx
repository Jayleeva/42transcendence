import { SelectHTMLAttributes } from 'react';

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectOption[];
  placeholder?: string;
};

export default function Select({
  label,
  id,
  options,
  placeholder,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        className={`rounded-lg border border-slate-300 bg-white px-4 py-3 focus:border-black focus:outline-none ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

{/* 
  Reprend la meme logique que le composant input
  Définit deux types TypeScript  ( pour etre sur que les do nnees aient le bon format)

  type SelectOption = pour un choix unique ( value et label)

  • options: SelectOption[] : 
  Les crochets [] indiquent que options doit être un tableau (une liste) contenant plusieurs objets de type SelectOption.

  La fonction .map() parcourt le tableau options et transforme chaque objet en une balise HTML <option> 
  key={option.value} : En React, chaque élément généré dans une boucle doit avoir un identifiant unique (key). 
  Cela permet à React de suivre chaque option efficacement sans recharger toute la liste en cas de modification.
  value={option.value} : C'est la donnée réelle qui sera récupérée lorsque l'utilisateur validera le formulaire.
  {option.label} : C'est le texte visible par l'utilisateur dans le menu déroulant.

*/}