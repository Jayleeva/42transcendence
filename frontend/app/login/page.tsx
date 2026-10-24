import Link from 'next/link';
import Button from '@/components/ui/Button';
import BackButton from '@/components/ui/BackButton';
import Form from '@/components/features/form/Form';

export default function Page() {
  const values = [
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email"
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Mot de passe"
    }
  ];

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="flex w-full max-w-md flex-col gap-6">
        <BackButton />
        <h1 className="font-display text-5xl font-bold text-center">
          Connectez-vous
        </h1>

        <Button type="button">Se connecter avec votre login 42</Button>

        <div className="flex items-center gap-4">
          <hr className="flex-1 border-slate-300" />
          <span className="text-sm text-slate-500">ou</span>
          <hr className="flex-1 border-slate-300" />
        </div>

        <Form
          inputs={values}
          conf={{ type: "submit", variant: "outline", name: "Se connecter" }}
        />

        <p className="text-center text-sm">
          Pas de compte ?{' '}
          <Link href="/register" className="font-semibold underline">
            Créez-en un ici
          </Link>
        </p>
      </div>
    </main>
  );
}