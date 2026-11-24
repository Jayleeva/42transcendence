"use client"

import { callApiWithCookie } from "@/utils/functions/callApiWithCookie";
import MiniButton from "./MiniButton";
import { redirect } from "next/navigation";
import { pathToFileURL } from "url";


export default async function DeleteButton({ path }: { path: string }) {
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await callApiWithCookie(path, 'DELETE');

    console.log(response);
    if (response !== null) {
        alert("Action confirmée!");
        redirect('/login');
    } else {
    // Affiche les erreurs précises du backend NestJS ou un message par défaut
    const details = response?.error?.errors
        ?.map((e: any) => `${e.field} : ${e.code}`)
        .join('\n') || response?.error?.message || "Erreur inconnue";
    alert(`Erreur :\n${details}`);
    }
  }
    return (
        <div>
            <MiniButton onClick={handleDelete} type="button" variant="primary">Supprimer</MiniButton>
        </div>
    )
};