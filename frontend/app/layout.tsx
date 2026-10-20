// la structure gloable
// header, footer, etc

// test below
// export default function RootLayout({ children }) {
//   return <html><body>{children}</body></html>;
// }

// test du tuto 
import '@/app/globals.css';
import { dongle } from '@/lib/fonts';

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