// la page de conversation entre 2 users

import Avatar from '@/components/ui/Avatar';
import ChatBubble from '@/components/features/ChatBubble';
import MessageInput from '@/components/features/MessageInput';
import { callApiWithCookie } from '@/utils/functions/callApiWithCookie';

export const metadata={
    title:'Messagerie',
};

const history = [
  {message: "Salut, ton chien est trop mignon !", isOwn:false, time:"12:30"},
  {message: "Merci ! Il s’appelle Milo.", isOwn:true, time:"12:31"}
];

export default async function Page({
  params,
  }: {
  params: Promise<{ 'convid': string }>;
  }) {
  const { 'convid': convId } = await params;
  
  //const conversationData = await callApiWithCookie(`/api/conversations/${convId}`, 'GET'); --> appel API pour recuperer le vrai  historique a l'arrivee sur la page
  //useEffect pour setMessages a chaque fois qu'on recoit un event onmessage
  return (
    <>
      <header className="flex items-center gap-3 border-b border-brand px-6 py-4">
        <Avatar size="sm" alt="Melo">M</Avatar>
        <h1 className="font-semibold text-brand">Melo</h1>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-6 py-4">
        {history.map((i:any) => (
          <div key={i.id}>
            <ChatBubble message={i.name} isOwn={i.isOwn} time={i.time}/>
          </div>
          ))}
      </div>

      <MessageInput />
    </>
  );
}

{/* 
    Juste visu ici
    rien est vraiment codé pour que ca link avec le back
*/}
