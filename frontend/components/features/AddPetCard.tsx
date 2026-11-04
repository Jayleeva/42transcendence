import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';

export default function AddPetCard() {
  return (
    <Link
      href="/pet/create"
      className="flex aspect-[2/3] w-40 flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-brand p-4 text-brand text-sm transition hover:-translate-y-1 hover:bg-brand/10"
    >
      <Avatar src={undefined}></Avatar>
      <span className="text-center font-semibold">Ajouter un animal</span>
    </Link>
  );
}
