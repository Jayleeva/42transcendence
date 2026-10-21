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
    primary: 'bg-brand text-white hover:brightness-90',
    outline: 'border border-brand text-brand hover:bg-brand/10',
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

/* 
Button component for the application 

& combine tout ce qu’un bouton normal accepte + ma propre prop variant »
? rend variant optionnelle

Attention ! majuscule obligatoire pour composant sinon marche pas
est un composant pas une balise html

Les accolades dans les parenthèses extraient les props reçues
variant = 'primary' fixe une valeur par défaut. className = ''
children est tout ce qui est écrit entre <Button> et </Button>
...props récupère tout le reste (type, onClick, disabled...)
: ButtonProps applique le type défini plus haut

const base = 'w-full rounded-lg px-4 py-3 font-semibold transition-colors cursor-pointer';
Les classes communes à tous les boutons : pleine largeur, coins arrondis, 
marges intérieures, texte en semi-gras, transition douce des couleurs, curseur en main

Les backticks avec ${...} collent plusieurs morceaux de texte 
en une seule chaîne de classes : base + variante + classes supplémentaires éventuelles.
{children} affiche le texte du bouton

*/