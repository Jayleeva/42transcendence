"use client"

import Input from "../../ui/Input";
import Button from '@/components/ui/Button';
import { callApiWithCookie } from "@/utils/functions/callApiWithCookie";
import { redirect } from 'next/navigation';

type InputProps = {
    id: string;
    name: string;
    type: string;
    label: string;
    error?: string;
}

type ButtonProps = {
    type: "submit" | "reset" | "button" | undefined;
    variant: 'primary' | 'outline';
    name: string;
    call: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    endpoint: "/api/auth/register" | "/api/auth/login" | string;  
    redirect: "/login" | "/feed" | string;
}

interface FormProps {
    inputs: InputProps[];
    conf: ButtonProps;
}


export default function Form({inputs, conf}: FormProps)
{
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault(); // empeche le reload

        const formData = new FormData(event.currentTarget);

        const data = Object.fromEntries(formData.entries());
        console.log("Donnees : ", data);

        const response = await callApiWithCookie(conf.endpoint, conf.call, JSON.stringify(data));
        /*const response = await fetch(conf.endpoint, {
            method: conf.call,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });*/

        if (response != null) {
            alert("Action confirmée!");
            if (conf.redirect)
                redirect(conf.redirect);
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
                {inputs.map((i:any) => (
                    <div key={i.id}>
                        <Input id={i.id} name={i.name} type={i.type} label={i.label}/>
                    </div>
                ))}
            </div>
            <Button type={conf.type} variant={conf.variant}>
                {conf.name}
            </Button>
        </form>
    );
}