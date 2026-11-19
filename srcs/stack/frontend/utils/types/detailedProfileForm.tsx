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
    /*{
      id:"birthDate",
      name:"birthDate",
      type:"date",
      label:"Date de naissance",
      disabled:true,
      as:'input',
    },*/
    {
      id:"email",
      name:"email",
      type:"email",
      label:"Email",
      disabled:true,
      as:'input',
    },
  ];

  export const detailedProfileConf = 
  {
    type:"submit",
    variant:"outline",
    name:"Valider les modifications",
    call:"PATCH",
    endpoint:"/api/users/me",
  } as const;
