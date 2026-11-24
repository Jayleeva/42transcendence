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
    'rounded-xl px-4 py-1 font-normal text-xs transition-colors';
  const styles = {
    primary: 'bg-red-700 text-white hover:brightness-90',
    outline: 'bg-brand text-white hover:brightness-90',
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}