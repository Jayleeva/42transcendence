import Input from "../../ui/Input";

type InputProps = {
    label: string;
    id: string;
    name: string;
    type: string;
}

interface FormProps {
    inputs: InputProps[];
}

export default function Form({inputs}: FormProps)
{
    return (
        <form className="flex flex-col gap-4">
            {inputs.map((i:any) => (
                <div>
                    <Input label={i.label} id={i.id} name={i.name} type={i.type}  />
                </div>
            ))}
        </form>
    );
}