// test de file pour stocker les fonts utilisees dans le projet
// pas sure de l'emplacement de ce fichier, mais je le mets la pour l'instant

import { Dongle } from 'next/font/google';

export const dongle = Dongle({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-dongle',
  preload: false,
});