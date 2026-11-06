// bulle de message pour le chat

type ChatBubbleProps = {
  message: string;
  isOwn?: boolean; // true = message que j'ai envoyé
  time?: string;   // ex: "14:32"
};

export default function ChatBubble({ message, isOwn = false, time }: ChatBubbleProps) {
  return (
    <div className={`flex w-full ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isOwn
            ? 'rounded-br-sm bg-brand text-white'
            : 'rounded-bl-sm bg-slate-100 text-black'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message}</p>
        {time && (
          <p className={`mt-1 text-right text-xs ${isOwn ? 'text-white/70' : 'text-slate-500'}`}>
            {time}
          </p>
        )}
      </div>
    </div>
  );
}

{/* 
    new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    
    isIwn va etre gerer par le back ? en foncrtion de qui est co ? 

    littéraux de gabarits (les guillemets inversés ` ` avec ${...}
    ca va apploquer dynamiquement selon si c'est own ou pas 

    important : • whitespace-pre-wrap : Indispensable pour les messages. 
    Cela respecte les retours à la ligne ( touche Entrée) 
    et les espaces tapés par l'utilisateur.

    
    */}