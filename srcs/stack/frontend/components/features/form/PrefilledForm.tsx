"use client"

import Input from "@/components/ui/Input";
import MiniButton from "@/components/ui/MiniButton";
import { useState, useEffect } from 'react';

type InputProps = {
    id: string;
    name: string;
    type: string;
    label: string;
}

type MiniButtonProps = {
    type: "submit" | "reset" | "button" | undefined;
    variant: 'primary' | 'outline';
    name: string;
    call: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    endpoint: "/api/auth/register" | "/api/auth/login" | string;
}

interface FormProps {
    inputs: InputProps[];
    miniconf: MiniButtonProps;
    initialData: any; //à changer
}

interface FormState {
  [key: string]: any; // 👈 Ceci autorise TypeScript à indexer l'objet avec une variable (ex: formData[input.name])
  firstname: string;
  lastname: string;
  username: string;
  birth: string;
  email: string;
}

export default function PrefilledForm({inputs, miniconf, initialData}: FormProps)
{
    const [formData, setFormData] = useState<FormState>({
    firstname: initialData?.firstname || '',
    lastname: initialData?.lastname || '',
    username: initialData?.username || '',
    birth: initialData?.birth || '',
    email: initialData?.email || '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                firstname: initialData.firstname || '',
                lastname: initialData.lastname || '',
                username: initialData.username || '',
                birth: initialData.birth || '',
                email: initialData.email || '',
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault(); // empeche le reload

        const formData = new FormData(event.currentTarget);

        const data = Object.fromEntries(formData.entries());
        console.log("Donnees : ", data);

        const response = await fetch(miniconf.endpoint, {
            method: miniconf.call,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Action confirmée!");
        } else {
            alert("Erreur");
        };
    };
    
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                {inputs.map((i:any) => (
                    <div key={i.id}>
                        <Input id={i.id} name={i.name} type={i.type} label={i.label} value={formData[i.name] || ''} onChange={handleChange} />
                    </div>
                ))}
            </div>
            <MiniButton type={miniconf.type} variant={miniconf.variant}>
                {miniconf.name}
            </MiniButton>
        </form>
    );
}