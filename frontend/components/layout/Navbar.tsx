// Navigation bar 

import Link from "next/link";
import { Bell, CirclePlus, CircleUserRound, House, Mail, Search } from 'lucide-react';

const links = [
  { href: '/feed', label: 'Accueil', Icon: House },
  { href: '/messages', label: 'Messages', Icon: Mail },
  { href: '/notifications', label: 'Notifications', Icon: Bell },
  { href: '/search', label: 'Recherche', Icon: Search },
  { href: '/pet/create', label: 'Créer un animal', Icon: CirclePlus },
  { href: '/profile-student', label: 'Mon profil', Icon: CircleUserRound },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center gap-10 bg-brand px-6 py-3 text-white ">
      {links.map(({ href, label, Icon }) => (
        <Link key={href} href={href} aria-label={label} className="hover:opacity-70">
          <Icon size={32} />
        </Link>
      ))}
    </nav>
  );
}

// test pour couleur et taille
/*             
<Link href="/feed">
    <House size={40}color="#3e7d9e"/>
</Link>
*/

// meme technique que pour le form, on passe par une map()

// si barre em bas add : fixed bottom-0 inset-x-0