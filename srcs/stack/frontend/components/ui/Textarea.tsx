import { TextareaHTMLAttributes } from 'react';

type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  lastValue: string | null;
};

export default function Textarea({
  id,
  name,
  className = '',
  lastValue,
  onChange,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <textarea
        {...props}
        key={lastValue ?? ''}
        id={id}
        name={name}
        rows={4}
        defaultValue={lastValue ?? ''}
        onChange={onChange}
        className={`rounded-lg border border-slate-300 px-4 py-3 focus:border-black focus:outline-none ${className}`}
      />
    </div>
  );
}
