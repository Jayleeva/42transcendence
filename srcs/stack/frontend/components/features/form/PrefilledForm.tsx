"use client";

import { useState, useEffect } from 'react';
import Avatar from "@/components/ui/Avatar";
import Input from "@/components/ui/Input";
import MiniButton from "@/components/ui/MiniButton";
import Select from "@/components/ui/Select";
import Modal from "@/components/ui/Modal"; // <-- Import ajouté
import { callApiWithCookie } from "@/utils/functions/callApiWithCookie";
import { petTypes } from "@/lib/petTypes";
import { FieldProps } from '@/utils/types/FieldProps';
import Textarea from '@/components/ui/Textarea';


type MiniButtonProps = {
    type: "submit" | "reset" | "button" | undefined;
    variant: 'primary' | 'outline';
    name: string;
    call: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
};

interface FormProps<T extends Record<string, any>> {
    fields: FieldProps[];
    miniconf: MiniButtonProps;
    endpoint: string;
    initialData?: Partial<T> | null;
}

function buildState<T extends Record<string, any>>(
    fields: FieldProps[],
    initialData?: Partial<T> | null
): T {
    const state: Record<string, any> = {};
    fields.forEach((field) => {
        console.log("field name = ", field.name);
        const tmp = initialData?.[field.name] ?? undefined;
        if (field.type === "date") {
            state[field.name] = tmp?.split('T')[0];
        } else {
            state[field.name] = tmp;
        }
    });
    return state as T;
}

export default function PrefilledForm<T extends Record<string, any>>({
    fields,
    miniconf,
    endpoint,
    initialData,
}: FormProps<T>) {
    // --- États du formulaire ---
    const [formData, setFormData] = useState<T>(() =>
        buildState<T>(fields, initialData)
    );
    
    const [savedData, setSavedData] = useState<Partial<T> | null | undefined>(initialData);

    // --- États de la modale & avatar (déplacés ici) ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | undefined>(initialData?.avatar);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [tempFile, setTempFile] = useState<File | null>(null);
    const [tempPreview, setTempPreview] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (initialData != null) {
            setSavedData(initialData);
            setFormData(buildState<T>(fields, initialData));
            console.log("formdata = ", JSON.stringify(formData));
            if (initialData.avatar) setAvatarUrl(initialData.avatar);
        }
    }, [initialData, fields]);

    // --- Gestion de la photo ---
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (tempPreview) URL.revokeObjectURL(tempPreview);

        if (file) {
            setTempFile(file);
            setTempPreview(URL.createObjectURL(file));
        } else {
            setTempFile(null);
            setTempPreview(undefined);
        }
    };

    const handleConfirmPhoto = () => {
        if (tempPreview && tempFile) {
            if (avatarUrl && avatarUrl.startsWith('blob:')) URL.revokeObjectURL(avatarUrl);
            setAvatarUrl(tempPreview);
            setAvatarFile(tempFile);
        }
        setIsModalOpen(false);
        setTempFile(null);
        setTempPreview(undefined);
    };

    const handleCloseModal = () => {
        if (tempPreview) URL.revokeObjectURL(tempPreview);
        setIsModalOpen(false);
        setTempFile(null);
        setTempPreview(undefined);
    };

    // --- Gestion des champs ---
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // --- Soumission ---
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const submittedFormData = new FormData(event.currentTarget);
        const data: Record<string, any> = {};
        submittedFormData.forEach((value, key) => {
            data[key] = value === '' ? undefined : value;
        });

        // Note : Si votre API attend du JSON, avatarFile ne peut pas être envoyé tel quel.
        // Si votre API attend un FormData (multipart), passez `submittedFormData` au lieu de `JSON.stringify(data)`.
        const response = await callApiWithCookie(
            endpoint,
            miniconf.call,
            JSON.stringify(data)
        );

        if (response !== null && !response?.error) {
            alert("Action confirmée!");
            setSavedData(response);
            setFormData(buildState<T>(fields, response));
        } else {
            const details =
                response?.error?.errors
                    ?.map((e: any) => `${e.field} : ${e.code}`)
                    .join('\n') ||
                response?.error?.message ||
                "Erreur inconnue";
            alert(`Erreur :\n${details}`);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <section className="flex flex-col items-start gap-4">
                    <h2 className="font-bold">Photo de profil</h2>
                    <Avatar src={avatarUrl} />
                    <MiniButton
                        type="button"
                        variant="outline"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Ajouter / modifier
                    </MiniButton>
                </section>

                <h2 className="font-bold">Bio</h2>
                <Textarea id="bio" name="bio" placeholder="Entrez une description..." lastValue={formData.bio ?? ''}/>

                <h2 className="font-bold">Informations générales</h2>
                <div className="flex flex-col gap-4">
                    {fields.map((field) => (
                        <div key={field.id}>
                            {field.as === 'select' ? (
                                <Select
                                    id={field.id}
                                    name={field.name}
                                    label={field.label}
                                    placeholder={field.placeholder ?? ''}
                                    value={formData[field.name] ?? ''}
                                    onChange={handleChange}
                                    options={field.options ?? petTypes}
                                />
                            ) : field.as === 'textarea' ? (
                                <Textarea
                                    id={field.id}
                                    name={field.name}
                                    placeholder={field.placeholder ?? ''}
                                    lastValue={formData[field.name] ?? ''}
                                />
                            ) : (
                                <Input
                                    id={field.id}
                                    name={field.name}
                                    type={field.type}
                                    label={field.label}
                                    value={formData[field.name] ?? ''}
                                    disabled={field.disabled}
                                    onChange={handleChange}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <MiniButton type={miniconf.type} variant={miniconf.variant}>
                    {miniconf.name}
                </MiniButton>
            </form>

            {/* Modale placée en dehors du <form> comme indiqué dans votre commentaire */}
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                title="Modifier la photo de profil"
                size="md"
            >
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-4">
                        <Avatar src={tempPreview || avatarUrl} />

                        <label className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
                            Choisir un fichier
                            <input
                                id="user-photo-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                        <span className="truncate text-sm italic text-slate-500">
                            {tempFile ? tempFile.name : 'Aucun fichier choisi'}
                        </span>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        <MiniButton
                            type="button"
                            onClick={handleConfirmPhoto}
                            variant="outline"
                            disabled={!tempFile}
                        >
                            Appliquer la photo
                        </MiniButton>
                    </div>
                </div>
            </Modal>
        </>
    );
}
