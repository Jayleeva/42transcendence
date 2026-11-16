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
    placeholder?: string;
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
    avatar?: string;
    bio?: string;
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
        const tmp = initialData?.[field.name] ?? undefined;
        if (field.type === "date") {
            state[field.name] = tmp?.split('T')[0];
        }
        else
            state[field.name] = tmp;
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
    
    // 1. Nouveau state pour mémoriser les données déjà enregistrées
    const [savedData, setSavedData] = useState<Partial<T> | null | undefined>(initialData);

    useEffect(() => {
        if (initialData != null) {
            setSavedData(initialData);
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
        const data: Record<string, any> = {};
        submittedFormData.forEach((value, key) => {
            data[key] = value === '' ? undefined : value;
        });

        const response = await callApiWithCookie(miniconf.endpoint, miniconf.call, JSON.stringify(data));

        if (response !== null && !response?.error) {
            alert("Action confirmée!");
            // 2. On met à jour savedData pour verrouiller immédiatement le champ birthDate
            setSavedData(response);
            setFormData(buildState<T>(fields, response));
        } else {
            const details = response?.error?.errors
                ?.map((e: any) => `${e.field} : ${e.code}`)
                .join('\n') || response?.error?.message || "Erreur inconnue";
            alert(`Erreur :\n${details}`);
        }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                {fields.map((field) => {
                    // 3. Le champ est désactivé s'il est configuré comme tel OU si c'est birthDate déjà enregistré
                    const isFieldDisabled =
                        field.disabled ||
                        (field.name === "birthDate" && Boolean(savedData?.birthDate));

                    return (
                        <div key={field.id}>
                            <Input
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                label={field.label}
                                value={formData[field.name] ?? ''}
                                disabled={isFieldDisabled}
                                onChange={handleChange}
                            />
                        </div>
                    );
                })}
            </div>
            <div>
                <MiniButton type={miniconf.type} variant={miniconf.variant}>
                    {miniconf.name}
                </MiniButton>
            </div>
        </form>
    );
}
