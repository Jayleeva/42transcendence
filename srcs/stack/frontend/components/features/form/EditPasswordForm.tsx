"use client"

import Input from "@/components/ui/Input";
import MiniButton from "@/components/ui/MiniButton";
import { callApiWithCookie } from "@/utils/functions/callApiWithCookie";
import { editPasswordFormConf, editPasswordFormInputs } from "@/utils/types/editPasswordForm";

export default function EditPasswordForm()
{
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault(); // empeche le reload

        const formData = new FormData(event.currentTarget);

        const data = Object.fromEntries(formData.entries());
        console.log("Donnees : ", data);

        const response = await callApiWithCookie(editPasswordFormConf.endpoint, editPasswordFormConf.call, JSON.stringify(data));

        console.log(response);
        if (response !== null) {
            alert("Action confirmée!");
        } else {
        // Affiche les erreurs précises du backend NestJS ou un message par défaut
        const details = response?.error?.errors
            ?.map((e: any) => `${e.field} : ${e.code}`)
            .join('\n') || response?.error?.message || "Erreur inconnue";
        alert(`Erreur :\n${details}`);
        }
    };
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
            {editPasswordFormInputs.map((field:any) => (
                <div key={field.id}>
                <Input id={field.id} name={field.name} type={field.type} label={field.label}/>
                </div>
            ))}
        </div>
        <MiniButton type={editPasswordFormConf.type} variant={editPasswordFormConf.variant}>
            {editPasswordFormConf.name}
        </MiniButton>
        </form>
    );
}