// page de profil du student, avec ses infos et ses pets

import AddPetCard from "@/components/features/AddPetCard";
import MiniPetCard from "@/components/features/MiniPetCard";
import StudentCard from "@/components/features/StudentCard";
import { redirect } from 'next/navigation';
import { getDataFromDb } from '@/utils/functions/getDatafromDb';
import { getNfriends } from "@/utils/functions/getNfriends";

export default async function Page() {
  const userData = await getDataFromDb('http://backend:8000/api/auth/me', 'GET');

  console.log("recieved userdata = " + userData);
  if (!userData) {
    redirect('/login');
  }

  return (
    <main className="flex flex-col items-start item-centerjustify-center gap-6 px-6 py-12 min-h-screen max-w-2xl mx-auto">
      <StudentCard id={userData.id} username={userData.username } photoUrl={userData.avatarUrl} bio={userData.bio} nfriends={await getNfriends()} /> 

      <div className="flex flex-row items-center gap-4 w-full">
        <MiniPetCard id={1} name={'Milo'} />
        {userData.pets.map((i:any) => (
          <div key={i.id}>
            <MiniPetCard id={i.id} name={i.name} />
          </div>
        ))}
      <AddPetCard />
      </div>
    </main>
  );
}