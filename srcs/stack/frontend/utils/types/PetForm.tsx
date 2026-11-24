
import { petTypes } from "@/lib/petTypes";
import { FieldProps } from "./FieldProps";

  export const petFormFields: FieldProps[] = [
    {
      id:"name",
      name:"name",
      type:"name",
      label:"Nom",
      disabled:false,
      as: 'input',
    },
    {
      id:"species",
      name:"species",
      label:"Espèce",
      disabled:false,
      as: 'select',
      placeholder:"Sélectionnez une espèce",
      options:petTypes,
    },
    {
      id:"race",
      name:"race",
      type:"text",
      label:"Race",
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
      label:"Bio",
      placeholder:"Ecrivez quelque chose à propos de votre animal...",
      disabled:false,
      as: 'textarea',
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
  } as const;