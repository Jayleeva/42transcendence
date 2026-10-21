// la structure gloable
// header, footer, etc

// test below
// export default function RootLayout({ children }) {
//   return <html><body>{children}</body></html>;
// }

// test du tuto 
import '@/app/globals.css';
import { dongle } from '@/lib/fonts';

// test titre onglet 
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lauzanimo',
  description: 'Le réseau social des animaux de compagnie des étudiants de 42',
};

// modif children car ca marchait pas 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={dongle.variable}>
      <body>{children}</body>
    </html>
  );
}

/* 
dongle.variable est une classe générée par Next qui définit 
la variable CSS --font-dongle sur toute la page. 
C’est elle que @theme inline relie ensuite à font-display.

<body>{children}</body>
ca c'est la page courante. Plusbtard on mettra navbar et footer
ex :
<body>
  <Navbar />
  {children}
  <Footer />
</body>
*/