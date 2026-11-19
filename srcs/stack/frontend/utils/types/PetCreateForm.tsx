
import { petTypes } from "@/lib/petTypes";
import { FieldProps } from "./FieldProps";

  export const petFormFields: FieldProps[] = [
    {
      id:"name",
      name:"name",
      type:"name",
      label:"Pseudo",
      disabled:false,
      as: 'input',
    },
    {
      id:"type",
      name:"type",
      label:"Type",
      disabled:false,
      as: 'select',
      placeholder:"Sélectionnez un type d'animal",
      options:petTypes,
    },
    {
      id:"race",
      name:"race",
      type:"text",
      label:"race",
      disabled:false,
      as: 'input',
    },
    {
      id:"birthDate",
      name:"birthDate",
      type:"date",
      label:"Date de naissance",
      disabled:false,
      as: 'input',
    },
    {
      id:"bio",
      name:"bio",
      type:"text",
      label:"Description / Informations",
      disabled:true,
      as: 'input',
    },
  ];

  export const petCreateFormConf = 
  {
    type:"submit",
    variant:"outline",
    name:"Enregistrer",
    call:"POST",
    endpoint:"/api/pets",
    redirect:"/profile-student",
  } as const;


  export const petEditFormConf = 
  {
    type:"submit",
    variant:"outline",
    name:"Valider les modifications",
    call:"PATCH",
    endpoint:"/api/pets/:id",
  } as const;