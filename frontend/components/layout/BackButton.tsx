"use client"

import { useRouter } from 'next/navigation';
import { IoArrowBack } from "react-icons/io5";
import Button from '../ui/Button';

export default function BackButton() {
  const router = useRouter()

  return (
    <Button variant="primary" onClick={() => {
        router.back();
    }}>
        <IoArrowBack />
        Retour
      </Button>
  );
}