// Footer

import Link from 'next/link';

const links = [
  { href: '/privacy', label: 'Politique de confidentialité' },
  { href: '/terms', label: 'CGU' },
  { href: '/team', label: 'Équipe' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-100 px-6 py-3 text-sm text-slate-600 fixed bottom-0 inset-x-0">
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="hover:underline">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}