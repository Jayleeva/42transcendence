// avatar ( rond comme les photos de profil de 42 ) pour les users et les pets

import Image from 'next/image';

{/* 
    Chekc si on arrive a predefinir plusieurs tailles
    small pour messageire ( ou xs ? )
    medium pour les card
    large pour les profils
    */}

export default function Avatar({ src, alt, children }: { src?: string; alt?: string; children?: React.ReactNode }) {
  return (
    <div className="relative w-30 h-30 rounded-full overflow-hidden bg-gray-200">
        {src ? (
            <Image src={src} alt={alt || 'Avatar'} fill sizes="100%" className="object-cover" />
        ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
            {children || 'A'}
            </div>
        )}
        </div>
    );
    }