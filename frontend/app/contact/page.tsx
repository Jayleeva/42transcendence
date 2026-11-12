// contact page

import StudentCard from '@/components/features/StudentCard';
import PetCard from '@/components/features/PetCard';
import Avatar from '@/components/ui/Avatar';
import MiniButton from '@/components/ui/MiniButton';
import ChatBubble from '@/components/features/ChatBubble';
import MessageInput from '@/components/features/MessageInput';
import SearchBar from '@/components/ui/SearchBar';
import BackButton from '@/components/ui/BackButton';

export const metadata={
    title:'Contact',
};

export default function Page() {
  return (
    <main className="min-h-screen px-6 py-12 md:px-8 max-w-7xl mx-auto">
      <BackButton />
      <h1 className="font-display text-6xl font-bold text-brand text-center">
        Contact
      </h1>
      <br />
      <br />
      <div className="text-center text-lg"> 
        <p>Des questions ? Vous pouvez nous contacter à l'adresse suivante :</p>
        <p className="font-bold">info@lauzanimo.com</p>
        <br />
        <p className="font-bold text-brand">42 Lausanne</p>
        <p>Rue de Lausanne 64</p>
        <p>1020 Renens</p>
        <p>Suisse</p>
        <br />
        <p className="italic">(mettre un formulaire de contact ?)</p>
      </div>
    </main>
  );
}
