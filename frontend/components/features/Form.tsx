"use client"

import Input from "../ui/Input";
import Button from '@/components/ui/Button';

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
}

interface FormProps {
    inputs: InputProps[];
    conf: ButtonProps;
}


export default function Form({inputs, conf}: FormProps)
{
    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault(); // empeche le reload

        const formData = new FormData(event.currentTarget);

        const data = Object.fromEntries(formData.entries());

        console.log("Donnees : ", data);
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

{/* 
    typage TypeScript
    Type et interface. POur input et button va definir forme exacte 
    FormProps. Précise que le composant <Form /> attend un tableau d'inputs
    et un objet de configuration pour le bouton (conf)

    handleSubmit = fonction qui sera appelée lors de la soumission du formulaire
    new FormData(event.currentTarget) = recup valeur contenue en utilisnt attributn name comme clé

    Object.fromEntries(formData.entries()). 
    Transforme ces données brutes en un objet JavaScript simple et lisible 
    (ex. : { firstname: "Alice", email: "alice@mail.com" }).

    console.log(...). Affiche l'objet final dans la console du navigateur

    return = rendu visuel
    <form onSubmit={handleSubmit}>. Relie l'événement de soumission du formulaire à la fonction handleSubmit.
    inputs.map(...). Parcourt le tableau inputs reçu en paramètre
    et crée un composant <Input /> pour chaque élément, en utilisant i.id comme key unique.

    <Button ...>. Affiche le bouton final en lui transmettant son type, son style (variant) et son texte (conf.name).
*/}