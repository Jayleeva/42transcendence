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
    <main className="flex min-h-screen w-full flex-col px-6 py-12 md:px-8 max-w-7xl mx-auto">
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

<div className="grid flex-1 grid-cols-1 gap-6 md:flex-none md:grid-cols-2">
        {/* COLONNE GAUCHE */}
        <div className="hidden md:flex md:flex-col md:justify-center">
          <div className="relative w-full h-[500px]">
            <Image
              src="/new-hero.png"
              alt="Patchwork Lauzanimo"
              fill
              sizes="50vw"
              priority
              className="object-contain"
            />
          </div>

          <p className="font-display text-2xl text-center mt-8 leading-none mx-auto max-w-lg">
            <span className="font-bold">Lauzanimo</span> est un réseau social de présentation des animaux de compagnie des étudiants de l’école 42.
            <br />
            Connectez-vous pour partager vos animaux de compagnie et découvrir ceux des autres étudiants !
          </p>
        </div>

        {/* COLONNE DROITE */}
        <div className="flex flex-col justify-center md:border-l-3 md:border-black md:px-8">
          <div className="mx-auto flex w-full max-w-md flex-col gap-4">
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
