"use client"

import { useRouter } from 'next/navigation';
import { IoArrowBack } from "react-icons/io5";

export default function BackButton() {
  const router = useRouter()

  return (
    <button type="button" onClick={() => {
        console.log("banane");
        router.back();
    }}>
        <IoArrowBack />
        Retour
      </button>
  );
}