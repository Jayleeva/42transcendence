"use client"

import Input from "../../ui/Input";
import Button from '@/components/ui/Button';
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { callApiWithCookie } from "@/utils/functions/callApiWithCookie";
import { FieldProps } from "@/utils/types/FieldProps";
import { redirect } from 'next/navigation';

type ButtonProps = {
    type: "submit" | "reset" | "button" | undefined;
    variant: 'primary' | 'outline';
    name: string;
    call: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    endpoint: string;
    redirect: string;
}

interface FormProps {
    fields: FieldProps[];
    conf: ButtonProps;
}


export default function Form({fields, conf}: FormProps)
{
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault(); // empeche le reload

        const formData = new FormData(event.currentTarget);

        const data = Object.fromEntries(formData.entries());
        console.log("Donnees : ", JSON.stringify(data));

        const response = await callApiWithCookie(conf.endpoint, conf.call, JSON.stringify(data));

        console.log(response);
        if (response !== null) {
            alert("Action confirmée!");
            if (conf.redirect) {
                /*if (conf.redirect.includes(":id")) {
                    redirect();
                }
                else*/
                    redirect(conf.redirect);
            }
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
                {fields.map((field:any) => (
                    <div key={field.id}>
                    {field.as === 'select' ? (
                    <Select id={field.id} name={field.name} label={field.label} placeholder={field.placeholder ?? ''} options={field.options}/>
                    ) : field.as === 'textarea' ? (
                    <Textarea id={field.id} name={field.name} placeholder={field.placeholder ?? ''} lastValue={field.lastValue}/>
                    ) : (
                    <Input id={field.id} name={field.name} type={field.type} label={field.label}/>
                    )}
                    </div>
                ))}
            </div>
            <Button type={conf.type} variant={conf.variant}>
                {conf.name}
            </Button>
        </form>
    );
}