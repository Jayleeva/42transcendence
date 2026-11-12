"use client"

import Input from "@/components/ui/Input";
import MiniButton from "@/components/ui/MiniButton";
import { callApiWithCookie } from "@/utils/functions/callApiWithCookie";
import { useState, useEffect } from 'react';

type FieldProps = {
    id: string;
    name: string;
    type: string;
    label: string;
    disabled: boolean;
}

type MiniButtonProps = {
    type: "submit" | "reset" | "button" | undefined;
    variant: 'primary' | 'outline';
    name: string;
    call: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    endpoint: string;
}

interface FormProps<T extends Record<string, any>> {
    fields: FieldProps[];
    miniconf: MiniButtonProps;
    initialData?: Partial<T> | null;
}

export interface StudentProfileFormState {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    avatar: string;
    bio: string;
    birthDate?: string;
}

export interface PetProfileFormState {
    name: string;
    type: string;
    race: string;
    avatar: string;
    bio: string;
    birthDate?: string;
}

export interface PasswordFormState {
    oldpassword: string;
    newpassword: string;
    confirmpassword: string;
}

function buildState<T extends Record<string, any>>(
    fields: FieldProps[],
    initialData?: Partial<T> | null
): T {
    const state: Record<string, any> = {};
    fields.forEach((field) => {
        state[field.name] = initialData?.[field.name] ?? undefined;
    });
    return state as T;
}

export default function PrefilledForm<T extends Record<string, any>>({
    fields,
    miniconf,
    initialData,
}: FormProps<T>) {
    const [formData, setFormData] = useState<T>(() =>
        buildState<T>(fields, initialData)
    );

    useEffect(() => {
        if (initialData != null) {
            setFormData(buildState<T>(fields, initialData));
        }
    }, [initialData, fields]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const submittedFormData = new FormData(event.currentTarget);
        //const data = Object.fromEntries(submittedFormData.entries());
        const data: Record<string, any> = {};
        submittedFormData.forEach((value, key) => {
            // Si le champ est vide (""), on met undefined pour que JSON.stringify retire la clé
            data[key] = value === '' ? undefined : value;
        })
        console.log("Données envoyées : ", data);

        const response = await callApiWithCookie(
            miniconf.endpoint,
            miniconf.call,
            JSON.stringify(data)
        );

        if (response != null) {
            alert("Action confirmée!");
        } else {
        // Affiche les erreurs précises du backend NestJS ou un message par défaut
        const details = response?.error?.errors
            ?.map((e: any) => `${e.field} : ${e.code}`)
            .join('\n') || response?.error?.message || "Erreur inconnue";
        alert(`Erreur :\n${details}`);
        }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                {fields.map((field) => (
                    <div key={field.id}>
                        <Input
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            label={field.label}
                            value={formData[field.name] ?? ''}
                            disabled={field.disabled}
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>
            <div>
                <MiniButton type={miniconf.type} variant={miniconf.variant}>
                    {miniconf.name}
                </MiniButton>
            </div>
        </form>
    );
}
