// avatar ( rond comme les photos de profil de 42 ) pour les users et les pets

import Image from 'next/image';

const AVATAR_SIZES = {
  sm: { box: 'size-10', px: 40, text: 'text-base' },   // messagerie
  md: { box: 'size-20', px: 80, text: 'text-3xl' },    // cards
  lg: { box: 'size-30', px: 120, text: 'text-5xl' },   // profils
};

type AvatarProps = {
  src?: string | null;
  alt?: string;
  size?: keyof typeof AVATAR_SIZES;
  children?: React.ReactNode;
};

export default function Avatar({ src, alt, size = 'lg', children }: AvatarProps) {
  const s = AVATAR_SIZES[size];

  return (
    <div className={`relative ${s.box} shrink-0 overflow-hidden rounded-full bg-gray-200`}>
      {src ? (
        <Image
          src={src}
          alt={alt || 'Avatar'}
          fill
          sizes={`${s.px}px`}
          className="object-cover"
        />
      ) : (
        <div className={`flex h-full w-full items-center justify-center text-gray-500 ${s.text}`}>
          {children || '?'}
        </div>
      )}
    </div>
  );
}

{/* 
    Avatar component 
    children?: React.ReactNode; = rend le composant flexible
    accepter et d'afficher du contenu placé entre sa balise ouvrante et sa balise fermante

    React.ReactNode : C'est le type le plus large pour tout ce que React est capable d'afficher à l'écran. 
    Cela inclut du texte brut, un nombre, une balise HTML (<span>), une icône, un autre composant React, 
    ou même rien du tout (null ou undefined).

    Apres on pourra jouter une pastille de statut par exemple 
    Afficher les initiale si pas de photo. OU alors juste le ? par defaut pour l'instant ? 
    afficher les badges eventuel si besoin sur l'avatar

    alt pour accessibilité : alt={alt || 'Avatar'}
    Veut dire que si on donne une description precise elle est utilisee, 
    sinon on met juste "Avatar" par defaut

    Les accolades ${...} à l'intérieur des guillemets obliques (`) permettent d'injecter ces valeurs directement dans les classes CSS Tailwind :
    • ${s.box} : Injecte les classes de largeur et de hauteur du cercle (ex: h-16 w-16).
    • ${s.text} : Injecte la taille de la police pour les initiales ou le ? (ex: text-xl), afin que le texte reste proportionnel à la taille du cercle.
    
    sizes={${s.px}px} = permet de choisir la bonne resolution d'image
    
*/}