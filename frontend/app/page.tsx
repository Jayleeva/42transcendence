// ici la page d'accueil de l'application ( landing page , se connecter ou creer un compte)

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Form from '@/components/features/form/Form';

export default function Page() {
  const values = [
    {
      id:"email",
      name:"email",
      type:"email",
      label:"Email"
    },
    {
      id:"password",
      name:"password",
      type:"password",
      label:"Mot de passe"
    }
  ];
  const conf = 
  {
    type:"submit",
    variant:"outline",
    name:"Se connecter"
  } as const;
  return (
    <main className="min-h-screen px-6 py-12 md:px-8 max-w-7xl mx-auto">
      <h1>
        <Image
          src="/banner.png"
          alt="Lauzanimo"
          width={400}
          height={120}
          priority
          className="h-auto w-[300px] md:w-[420px] mb-2"
        />
        {/* check className="hidden md:block" */}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* COLONNE GAUCHE */}
        <div>
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] hidden md:block">
            <Image
              src="/new-hero.png"
              alt="Patchwork Lauzanimo"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-contain"
            />
          </div>

          <p className="font-display text-2xl text-center mt-8 leading-none hidden md:block">
            <span className="font-bold">Lauzanimo</span> est un réseau social de présentation des animaux de compagnie des étudiants de l’école 42.
            <br />
            Connectez-vous pour partager vos animaux de compagnie et découvrir ceux des autres étudiants !
          </p>
        </div>

        {/* COLONNE DROITE */}
        <div className="md:border-l-3 md:border-black md:pl-8">
          <div className="flex max-w-md flex-col gap-6">
            <h2 className="font-display text-5xl font-bold text-center">
              Connectez-vous ou créez un compte
            </h2>

            <Button>Se connecter avec votre login 42</Button>

            <div className="flex items-center gap-4">
              <hr className="flex-1 border-slate-300" />
              <span className="text-sm text-slate-500">ou</span>
              <hr className="flex-1 border-slate-300" />
            </div>

            <Form inputs={values} conf={conf}/>

            <p className="text-center text-sm">
              Pas de compte ?{' '}
              <Link href="/register" className="font-semibold underline">
                Créez-en un ici
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}


/**
 * TODO: 
 * - supp l'hero image sur version mobile
 * - mettre option sur image pour la cacher qd on reduit trop l'ecran ( hidden md:block ) ?? 
 *  */ 



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
// md:px-16 ( on peut reduire a md:px-8 ) md: est le responsive ? Breaking point pour les ecrans moyens ( 768px )
//
// marge interieur ?
// px-6 py-12
// p = padding
// pt padding top, pb padding bottom ... 

//
// Pour les colonnes:
// c'est gap 12 now mais testé gap 6 pour voir la diff qd il y aura du content pour col de droite

/* 
hidden : masque l'élément (display: none).
md:block : à partir du breakpoint md, affiche l'élément comme un bloc (display: block).

Pour le responsive :
- flex : active Flexbox.
- flex-col : organise les éléments verticalement, donc en une colonne.
- md:flex-row : à partir de 768 px, les organise horizontalement, donc côte à côte.
- gap-4 : ajoute de l'espace entre les éléments.
la disposition passe automatiquement de deux colonnes à une seule qd on reduit l'ecran 
*/
