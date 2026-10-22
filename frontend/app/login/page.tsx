// la page pour creer un compte ( ou on met les infos basiques )

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function Page() {
  return (
    <main className="min-h-screen px-6 py-12 md:px-8 max-w-7xl mx-auto">
        {/* COLONNE */}
        <div className="md:border-l-3 md:border-black md:pl-8">
          <div className="flex max-w-md flex-col gap-6">
            <h2 className="font-display text-5xl font-bold text-center">
              Créez un compte
            </h2>

            <form className="flex flex-col gap-4">
              <Input id="email" name="email" type="email" label="Email" placeholder="vous@exemple.com" />
              <Input id="password" name="password" type="password" label="Mot de passe" />
            </form>

            <Button type="submit" variant="outline">Se connecter</Button>
            <p className="text-center text-sm">
              {' '}
              <Link href="/register" className="font-semibold underline">
                J'ai déjà un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}