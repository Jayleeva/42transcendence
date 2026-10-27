// contact page

import MiniButton from '@/components/ui/MiniButton';

export default function Page() {
  return (
    <main className="min-h-screen px-6 py-12 md:px-8 max-w-7xl mx-auto">
      <h1 className="font-display text-5xl font-bold text-center">
        Contact
      </h1>
      <p> contact info a mettre ici </p>
      <br />
      <p> Pour l'instant je me sers de cette page pour faire des tests visuels de composants </p>
      <br />
      <MiniButton >Supprimer</MiniButton>
      <br />
      <br />
      <MiniButton variant="outline">Valider</MiniButton> 
    </main>
  );
}