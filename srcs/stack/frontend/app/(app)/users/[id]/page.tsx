// page des autres utilisateurs ( consulter uniquement, on peut pas modif ou ajouter de photo )

import NotFound from "@/app/not-found";
import MiniPetCard from "@/components/features/MiniPetCard";
import StudentCard from "@/components/features/StudentCard";
import { callApiWithCookie } from "@/utils/functions/callApiWithCookie";
import { getNfriends } from "@/utils/functions/getNfriends";
import { redirect } from "next/navigation";

// penser a passer isOwner={false}
// comme ca la card addpet apparait pas 

export const metadata={
    title:'Profil',
};

export default async function Page({
  params,
  }: {
  params: Promise<{ 'id': string }>;
  }) {
  // 1. On attend la résolution de params et on extrait 'user-id' dans la variable userId
  const { 'id': userId } = await params;
  

  // 2. On injecte userId directement dans l'URL de l'API
  const userData = await callApiWithCookie(`/api/users/${userId}`, 'GET');
  
  console.log("recieved userdata recieved userdata for searched profile = " + JSON.stringify(userData));
  if (!userData) {
    return (NotFound());
  }

  return (
    <main className="flex flex-col items-start item-centerjustify-center gap-6 px-6 py-12 min-h-screen max-w-2xl mx-auto">
      <StudentCard id={userData.id} username={userData.username } photoUrl={userData.avatarUrl} bio={userData.bio} nfriends={await getNfriends()} /> 

      <div className="flex flex-row items-center gap-4 w-full">
        <MiniPetCard id={1} name={'Mochi'} />
        {userData.pets.map((i:any) => (
          <div key={i.id}>
            <MiniPetCard id={i.id} name={i.name} />
          </div>
        ))}
      </div>
    </main>
  );
}
