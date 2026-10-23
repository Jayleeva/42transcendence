// la page pour creer un compte ( ou on met les infos basiques )
import Link from 'next/link';
import BackButton from '@/components/layout/BackButton';
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
      type:"username",
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
  const conf = 
  {
    type:"submit",
    variant:"outline",
    name:"S'enregistrer"
  } as const;

  return (
    <main className="min-h-screen px-6 py-12 md:px-8 max-w-7xl mx-auto">
        {/* COLONNE */}
        <div className="flex max-w-md flex-col gap-6">
          <BackButton />
          <h2 className="font-display text-5xl font-bold text-center">
            Créez un compte
          </h2>

          <Form inputs={values} conf={conf} />

          <p className="text-center text-sm">
            {' '}
            <Link href="/login" className="font-semibold underline">
              J'ai déjà un compte
            </Link>
          </p>
        </div>
    </main>
  );
}

