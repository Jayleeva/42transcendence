// la structure gloable
// header, footer, etc

// test below
// export default function RootLayout({ children }) {
//   return <html><body>{children}</body></html>;
// }

// modif children car ca marchait pas 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}