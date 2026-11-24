// le layout specifique pour la messagerie avec les 2 colonnes 

import SearchBar from '@/components/ui/SearchBar';
import ConversationItem from '@/components/features/ConversationItem';

// truc codés en dur à remplacer par le backend i dont know hooowww
const conversations = [
  { id: 1, username: 'Melo', time: '12:30' },
  { id: 2, username: 'Marjo', time: '11:02' },
  { id: 3, username: 'Cynthia', time: 'Hier' },
  { id: 4, username: 'Lisa', time: 'Hier' },
  { id: 5, username: 'Mathieu', time: 'Hier' },
];

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto grid h-[calc(100dvh-7rem)] w-full max-w-7xl grid-cols-1 gap-6 px-4 py-4 md:grid-cols-3">
      {/* COLONNE GAUCHE : 1/3 */}
      <aside className="flex min-h-0 flex-col gap-4">
        <SearchBar placeholder="Rechercher quelqu’un..." aria-label="Rechercher une personne" />

        <nav aria-label="Conversations" className="min-h-0 flex-1 overflow-y-auto rounded-lg bg-slate-100">
          {conversations.map((c) => (
            <ConversationItem key={c.id} id={c.id} username={c.username} time={c.time} />
          ))}
        </nav>
      </aside>

      {/* COLONNE DROITE : 2/3 */}
      <section className="flex min-h-0 flex-col rounded-lg border border-brand md:col-span-2">
        {children}
      </section>
    </div>
  );
}

{/* 

    h-[calc(100dvh-7rem)] = 100% de la hauteur de la fenetre et on eleve 7 rem 
    navbar et footer ? 

    min-h-0 = astuce pour que ds le conteneur, ca force le defilement scroll interne
    et pas toute la page web du coup
    
    Attention ici : le responsive est moyennement geré
    check si on fait disparaitre la colonne de gauche, mais du coup comment on accede aux conv ? 
    check comment faire un truc clean 

    maybe : utiliser usePathname() ??? j'ai pas compris comment for now
    
*/}