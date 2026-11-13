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
        <br />
        <div className="mx-auto w-full md:w-1/2 rounded-[20px] overflow-hidden shadow-[10px_10px_0_0_#3e7d9e]">          
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2744.776562648884!2d6.591994399999999!3d46.5323231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c313bc50f881d%3A0x3391ff3a058119b7!2s42%20Lausanne!5e0!3m2!1sfr!2sch!4v1777026935914!5m2!1sfr!2sch" 
            className="w-full h-96 border-0 map-iframe" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade" 
            title="Carte indiquant l'emplacement du campus"
          ></iframe>
        </div>
        <br />
        <br />
        <p className="italic">(mettre un formulaire de contact en plus ?)</p>
      </div>
    </main>
  );
}

{/* 
    <iframe> = in line frame
    integre une page internet externe dans la page actuelle
    utile pour integrer map, youtube, spotify etc ... 
*/}
