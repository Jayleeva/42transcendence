"use client"

import Input from "../../ui/Input";
import Button from '@/components/ui/Button';
import { redirect } from 'next/navigation';

type InputProps = {
    label: string;
    id: string;
    name: string;
    type: string;
}

type ButtonProps = {
    type: "submit" | "reset" | "button" | undefined;
    variant: 'primary' | 'outline';
    name: string;
    call: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    endpoint: "/api/auth/register" | "/api/auth/login" | string;  
    redirect: `/login` | string;  
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

        const response = await fetch(conf.endpoint, {
            method: conf.call,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.status === 201) {
            alert("Action confirmée!");
            redirect(conf.redirect);
        } else {
            alert("Erreur");
        }
    };
    
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                {inputs.map((i:any) => (
                    <div key={i.id}>
                        <Input label={i.label} id={i.id} name={i.name} type={i.type}  />
                    </div>
                ))}
            </div>
            <Button type={conf.type} variant={conf.variant}>
                {conf.name}
            </Button>
        </form>
    );
}