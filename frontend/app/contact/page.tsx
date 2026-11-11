// contact page

import StudentCard from '@/components/features/StudentCard';
import PetCard from '@/components/features/PetCard';
import Avatar from '@/components/ui/Avatar';
import MiniButton from '@/components/ui/MiniButton';
import ChatBubble from '@/components/features/ChatBubble';
import MessageInput from '@/components/features/MessageInput';
import SearchBar from '@/components/ui/SearchBar';

export const metadata={
    title:'Contact',
};

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
      <br />
      <br />
      <Avatar src="/Placeholder-test.png" alt="Test Avatar"></Avatar>
      <br />
      <br />
      <PetCard id={1} type="dog" race="Labrador" info=" blablabli blala treeeeeeees long pour voir comment ca fait avec plusieurs lignes etc ................... " />
      <br />
      <br />
      <StudentCard id={1} username="John Doe"  bio=" blablabli blala treeeeeeees long pour voir comment ca fait avec plusieurs lignes etc ................... " />
      <br />
      <br />
      <div className="flex flex-col gap-2">
      <ChatBubble message="coucou !" time="14:32" />
      <ChatBubble message="Salut ! merci pour l'ajout ! voici mon chien Milo" isOwn time="14:35" />
      <ChatBubble message="il est trop beau c'est le plus beau chien de toute la vie de toute la terre j'ai jamais vu un chien aussi beau, je suis emerveillee de tant de beaute" time="14:40" />
      <ChatBubble message="Merci ! entierement d'accord!" isOwn time="14:45" />
      <MessageInput />
      </div>
      <SearchBar placeholder="Rechercher un utilisateur..." />
    </main>
  );
}
