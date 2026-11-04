// page de profil du student, avec ses infos et ses pets

import AddPetCard from "@/components/features/AddPetCard";
import MiniPetCard from "@/components/features/MiniPetCard";
import StudentCard from "@/components/features/StudentCard";

export default function Page() {
  return (
    <main className="flex flex-col items-start item-centerjustify-center gap-6 px-6 py-12 min-h-screen max-w-2xl mx-auto">
      <StudentCard id={1} name="Name test" photoUrl={undefined}></StudentCard>

      <div className="flex flex-row items-center gap-4 w-full">
      <MiniPetCard id={1} name="Milo" />
      <AddPetCard />
      </div>
    </main>
  );
}
 
