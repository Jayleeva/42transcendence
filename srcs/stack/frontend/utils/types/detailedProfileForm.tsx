  export const detailedProfileFormFields = [
    {
      id:"firstname",
      name:"firstname",
      type:"name",
      label:"Prénom",
      disabled:false,
      as:'input',
    },
    {
      id:"lastname",
      name:"lastname",
      type:"name",
      label:"Nom",
      disabled:false,
      as:'input',
    },
    {
      id:"username",
      name:"username",
      type:"username",
      label:"Pseudo",
      disabled:false,
      as:'input',
    },
    {
      id:"birthDate",
      name:"birthDate",
      type:"date",
      label:"Date de naissance",
      disabled:true,
      as:'input',
    },
    {
      id:"email",
      name:"email",
      type:"email",
      label:"Email",
      disabled:true,
      as:'input',
    },
    {
      id:"bio",
      name:"bio",
      type:"text",
      label:"Bio",
      placeholder:"Ecrivez quelque chose à propos de vous...",
      disabled:false,
      as:'textarea',
    },
  ];

  export const detailedProfileConf = 
  {
    type:"submit",
    variant:"outline",
    name:"Valider les modifications",
    call:"PATCH",
  } as const;
