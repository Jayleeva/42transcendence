// la ou on tape le gtexte pour envoyer les mess 

import { Send } from "lucide-react";

export default function MessageInput() {
  return (
    <form className="px-4 pb-4 pt-2">
      <label htmlFor="message" className="sr-only">
        Votre message
      </label>

      <div className="flex items-center rounded-full border-2 border-brand bg-white pr-2">
      <input
        id="message"
        name="message"
        type="text"
        placeholder="Entrez un message ..."
        autoComplete="off"
        className="w-full bg-transparent px-5 py-3 focus:outline-none"
      />
        <button
          type="submit"
          aria-label="Envoyer le message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white transition hover:opacity-80"
        >
          <Send size={20} />
        </button>

      </div>
    </form>
  );
}

// sr-only = screen reader 
// donc invisible mais juste pour l'accessibilité

{/* 
  POur l;instant qd on appuie sur le clavier "enter" ca envoie le message
  check comment faire pour que ca soit activé juste avec le clic du boutton
  il faut changer la logique  :
  passer le bouton en type="button"
  et mettre un onClick={handleSend} sur le bouton

  type="button" sur le bouton. Contrairement à type="submit", 
  un bouton simple ne réagit pas lorsque vous appuyez sur Entrée dans le champ texte. 
  Il ne s'active que lorsqu'on clique dessus.

  aussi gerer le saut de ligne ?? later ... 
*/}