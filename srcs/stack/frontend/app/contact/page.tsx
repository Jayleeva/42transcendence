// contact page

import BackButton from '@/components/ui/BackButton';
import Image from 'next/image';

export const metadata={
    title:'Contact',
};

export default function Page() {
  return (
    <main className="min-h-screen px-6 py-12 md:px-8 max-w-7xl mx-auto">
      <BackButton />
      <h1 className="font-display text-8xl font-bold text-brand text-center">
        Contact
      </h1>
                <h1>
                    <Image
                        src="/contact_bird.webp"
                        alt="Contact_bird"
                        width={200}
                        height={100}
                        priority
                        className="items-center justify-center mx-auto"
                    />
                </h1>
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
      </div>
    </main>
  );
}

{/* 
    <iframe> = in line frame
    integre une page internet externe dans la page actuelle
    utile pour integrer map, youtube, spotify etc ... 
*/}