// test button 

import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline';
};

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base =
    'w-full rounded-lg px-4 py-3 font-semibold transition-colors cursor-pointer';
  const styles = {
    primary: 'bg-brand text-white hover:bg-slate-800',
    outline: 'border border-black text-black hover:bg-slate-100',
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}