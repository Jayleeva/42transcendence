"use client"

import { useRouter } from 'next/navigation';
import { IoArrowBack } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex w-fit items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-brand hover:bg-brand/10"
    >
      <IoArrowBack />
      Retour
    </button>
  );
}
