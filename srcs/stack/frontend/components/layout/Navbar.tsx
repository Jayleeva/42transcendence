// Navigation bar 

import Link from "next/link";
import { Bell, CirclePlus, House, Mail, Search } from 'lucide-react';
import UserMenu from '@/components/layout/UserMenu';
import SearchModal from "@/components/ui/SearchModal";

// tableau pour creer les boutons
// url de dest, texte descrip, l'icone ( importé de lucide-react )

const links = [
  { href: '/feed', label: 'Accueil', Icon: House },
  { href: '/messages', label: 'Messages', Icon: Mail },
  { href: '/notifications', label: 'Notifications', Icon: Bell },
  { href: '/post/create', label: 'Créer un post', Icon: CirclePlus },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center gap-10 bg-brand px-6 py-3 text-white ">
      {links.map(({ href, label, Icon }) => (
        <Link key={href} href={href} aria-label={label} className="hover:opacity-70">
          <Icon size={32} />
        </Link>
      ))}
    <SearchModal />
    <UserMenu />
    </nav>
  );
}

// meme technique que pour le form, on passe par une map()

// key={href} est l'identifiant unique pour react 
// React utilise cette key pour mettre à jour uniquement l'élément concerné

// href={href} est l'url de destination du lien. Variable extraite du tableau links.

// aria-label={label}. Indique le nom du lien aux lecteurs d'écran pour l'accessibilité
// car le bouton ne contient qu'une icône et pas de texte visible
// et aussi pour le SEO 