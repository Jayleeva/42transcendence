// la page de conversation entre 2 users

import Avatar from '@/components/ui/Avatar';
import ChatBubble from '@/components/features/ChatBubble';
import MessageInput from '@/components/features/MessageInput';

export const metadata={
    title:'Messagerie',
};

export default function Page() {
  return (
    <>
      <header className="flex items-center gap-3 border-b border-brand px-6 py-4">
        <Avatar size="sm" alt="Melo">M</Avatar>
        <h1 className="font-semibold text-brand">Melo</h1>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-6 py-4">
        <ChatBubble message="Salut, ton chien est trop mignon !" time="12:30" />
        <ChatBubble message="Merci ! Il s’appelle Milo." isOwn time="12:31" />
      </div>

      <MessageInput />
    </>
  );
}

{/* 
    Juste visu ici
    rien est vraiment codé pour que ca link avec le back
*/}
