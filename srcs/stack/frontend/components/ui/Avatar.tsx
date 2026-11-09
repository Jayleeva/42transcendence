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

{/* Avatar component */}