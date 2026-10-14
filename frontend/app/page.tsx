// ici la page d'accueil de l'application ( landing page , se connecter ou creer un compte)

import Image from 'next/image';
import { dongle } from '@/lib/fonts';

export default function Page() {
  return (
    // Page entièrement blanche 'bg-white'
   <main className="min-h-screen bg-white text-slate-900 px-6 py-12 md:px-8 max-w-7xl mx-auto w-full">

      {/* titre*/}
      {/* <h1 className={`${dongle.className} text-8xl font-bold`}>Lauzanimo</h1>*/}

        <Image
          src="/test-banner.png"
          alt="Lauzanimo"
          width={400}
          height={120}
          priority
          className="h-auto w-[300px] md:w-[420px] mb-2" 
        />

      {/* Structure Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* COLONNE GAUCHE : hero image*/}
        <div>
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
            <Image
              src="/test-hero-image.png"
              alt="Patchwork Lauzanimo"
              fill
              priority
              className="object-contain"
            />
          </div>

          <p className={`${dongle.className} text-2xl text-center mt-8 leading-none`}>
            <span className="font-bold">Lauzanimo</span> est un réseau social de presentation des animaux de compagnie des etudiants de l'ecole 42.
            <br /> Connectez-vous pour partager vos animaux de compagnie et découvrir ceux des autres étudiants !
            
          </p>
        </div>

        {/* COLONNE DROITE : Totalement vide pour l'instant */}
        <div className="md:border-l-3 md:border-black md:pl-8">
        ( ICI SE CONNECTER CREER UN COMPTE ETC)
        <br /> Tester des trucs ici car zero mise en page for now 
        </div>

      </div>
    </main>
  );
}


// MEMO PERSO
//
// Pour les marges du texte:
// leading-none
// leading-tight
// leading-snug
// leading-normal
// leading-[0.9] ( valeur precise )
//
// Pour les marges de la page globale ? 
// md:px-16 ( on peut reduire a md:px-8 ) md: est le responsive ?
//
// marge interieur ?
// px-6 py-12
//
// Pour les colonnes:
// c'est gap 12 now mais testé gap 6 pour voir la diff qd il y aura du content pour col de droite
