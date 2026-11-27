// page de profil du student, avec ses infos et ses pets

import AddPetCard from "@/components/features/AddPetCard";
import MiniPetCard from "@/components/features/MiniPetCard";
import StudentCard from "@/components/features/StudentCard";
import { redirect } from 'next/navigation';
import { callApiWithCookie } from '@/utils/functions/callApiWithCookie';
import { getNfriends } from "@/utils/functions/getNfriends";

export const metadata={
    title:'Profil',
};

export default async function Page() {
  const userData = await callApiWithCookie('/api/users/me', 'GET');
  const petsData = await callApiWithCookie(`/api/users/me/pets`, 'GET');

  console.log("recieved userdata = " + JSON.stringify(userData));
  if (!userData) {
    redirect('/login');
  }
  return (
    <main className="flex flex-col items-start item-centerjustify-center gap-6 px-6 py-12 min-h-screen max-w-2xl mx-auto">
      <StudentCard id={userData.id} username={userData.username } photoUrl={userData.avatarUrl} bio={userData.bio} friends={userData.friends} nfriends={await getNfriends()}/> 

      <div className="flex flex-wrap gap-2 w-full">
        {petsData.map((i:any) => (
          <div key={i.id}>
            <MiniPetCard id={i.id} name={i.name} />
          </div>
        ))}
      <AddPetCard />
      </div>
      <h2 className="font-display text-3xl font-bold pt-4">Derniers posts :</h2>
    </main>
  );
}
 
