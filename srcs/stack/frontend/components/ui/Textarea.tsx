// pour la bio ( un grand champs de texte ) pour les users et les pets

import { TextareaHTMLAttributes, useEffect, useState } from 'react';

type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  lastValue: string | null,
};

export default function Textarea({ id, name, className = '', lastValue, onChange, ...props }: InputProps) {
  const [text, setText] = useState<string>(lastValue ?? '');
  useEffect(() => {
    if (lastValue !== undefined) {
      setText(lastValue ?? '');
    }
  }, [lastValue]);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  return (
    <div className="flex flex-col gap-1">
      <textarea
        id={id}
        name={name}
        rows={4}
        defaultValue={text}
        readOnly={false}
        disabled={false}
        onChange={() =>{handleChange}}
        className={`rounded-lg border border-slate-300 px-4 py-3 focus:border-black focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
}