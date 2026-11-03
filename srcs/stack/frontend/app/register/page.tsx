// la page pour creer un compte ( ou on met les infos basiques )
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';
import Form from '@/components/features/form/Form';
import { basicProfileConf, basicProfileFormInputs } from '@/utils/types/basicProfileForm';


export default function Page() {
  const userData = await getUserFromDb();
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="flex w-full max-w-md flex-col gap-6">
          <BackButton />
          <h2 className="font-display text-5xl font-bold text-center">
            Créez un compte
          </h2>

          <Form inputs={basicProfileFormInputs} conf={basicProfileConf}/>

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