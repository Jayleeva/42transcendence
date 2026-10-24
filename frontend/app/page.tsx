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
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* COLONNE GAUCHE */}
        <div>
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
            <Image
              src="/new-hero.png"
              alt="Patchwork Lauzanimo"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-contain"
            />
          </div>

          <p className="font-display text-2xl text-center mt-8 leading-none">
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
