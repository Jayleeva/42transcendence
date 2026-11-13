// messagerie generale ? avec les user connectes et conversation ouvertes

import ChatBubble from "@/components/features/ChatBubble";

export const metadata={
    title:'Messagerie',
};

export default function Page() {
  return (
    <main className="min-h-screen px-6 py-12 md:px-8 max-w-7xl mx-auto">
      <h1 className="font-display text-3xl italic text-center">
        Selectionnez un utilisateur pour commencer une conversation
      </h1>

    </main>
  );
}