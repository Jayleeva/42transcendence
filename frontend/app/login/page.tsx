// la page pour creer un compte ( ou on met les infos basiques )

import Button from '@/components/ui/Button';
import Link from 'next/link';
import Form from '@/components/features/form/Form';

export default function Page() {
  const values = [
    {
      id:"firstname",
      name:"firstname",
      type:"name",
      label:"Prénom"
    },
    {
      id:"lastname",
      name:"lastname",
      type:"name",
      label:"Nom"
    },
    {
      id:"username",
      name:"username",
      type:"name",
      label:"Pseudo"
    },
    {
      id:"birth",
      name:"birth",
      type:"date",
      label:"Date de naissance"
    },
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

  return (
    <main className="min-h-screen px-6 py-12 md:px-8 max-w-7xl mx-auto">
        {/* COLONNE */}
        <div className="md:border-l-3 md:border-black md:pl-8">
          <div className="flex max-w-md flex-col gap-6">
            <h2 className="font-display text-5xl font-bold text-center">
              Créez un compte
            </h2>

            <Form inputs={values} />

            <Button type="submit" variant="outline">Se connecter</Button>
            <p className="text-center text-sm">
              {' '}
              <Link href="/auth" className="font-semibold underline">
                J'ai déjà un compte
              </Link>
            </p>
          </div>
        </div>
    </main>
  );
}