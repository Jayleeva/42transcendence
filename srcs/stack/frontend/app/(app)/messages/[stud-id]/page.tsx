// la page de conversation entre 2 users
import Avatar from '@/components/ui/Avatar';
import ChatBubble from '@/components/features/ChatBubble';
import MessageInput from '@/components/features/MessageInput';
import { callApiWithCookie } from '@/utils/functions/callApiWithCookie';

export const metadata={
    title:'Messagerie',
};

// conversationData doit contenir:
// - la relation (user A et B)
// - l'historique de conv (message, sender, date/heure)
const id1 = "1";
const id2 = "5911b938-c74a-42ac-8fb8-a2869573939b";

const conversationData = {
  relation: [
    {idA: id1},
    {idB: id2},
  ],
  history: [
    {message: "Salut, ton chien est trop mignon !", sender:id1, time:"12:30"},
    {message: "Merci ! Il s’appelle Milo.", sender:id2, time:"12:31"}
  ]
}

export default async function Page({
  params,
  }: {
  params: Promise<{ 'convid': string }>;
  }) {
  const { 'convid': convId } = await params;

  //const conversationData = await callApiWithCookie(`/api/conversations/${convId}`, 'GET'); // --> appel API pour recuperer le vrai historique a l'arrivee sur la page

  const me = await callApiWithCookie(`/api/users/me`, 'GET');
  const contact = await whoIsNotme(conversationData.relation, me.id);
  const initials = contact.username[0].uppercase();

  async function whoIsNotme(relation: any, me: any) {
    if (relation[0] !== me)
        return await callApiWithCookie(`/api/users/${relation[0]}`, 'GET');
    else
      return await callApiWithCookie(`/api/users/${relation[1]}`, 'GET');
  }

  function isOwn(sender: string): boolean {
    if (sender === me.id)
      return true;
    else
      return false;
  }

  const history = conversationData.history;
  //useEffect pour setMessages a chaque fois qu'on recoit un event onmessage
  return (
    <>
      <header className="flex items-center gap-3 border-b border-brand px-6 py-4">
        <Avatar size="sm" alt={contact.username}>{initials}</Avatar>
        <h1 className="font-semibold text-brand">{contact.username}</h1>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-6 py-4">
        {history.map((i:any) => (
          <div key={i.id}>
            <ChatBubble message={i.message} isOwn={isOwn(i.sender)} time={i.time}/>
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

