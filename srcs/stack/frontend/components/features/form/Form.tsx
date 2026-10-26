"use client"

import Input from "../../ui/Input";
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