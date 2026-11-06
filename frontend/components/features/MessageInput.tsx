// la ou on tape le gtexte pour envoyer les mess 

export default function MessageInput() {
  return (
    <form className="px-0 pb-4 pt-2">
      <label htmlFor="message" className="sr-only">
        Votre message
      </label>
      <input
        id="message"
        name="message"
        type="text"
        placeholder="Entrez un message ..."
        autoComplete="off"
        className="w-full rounded-full border-2 border-brand px-5 py-3 focus:outline-none"
      />
    </form>
  );
}