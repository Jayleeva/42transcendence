  export const basicProfileFormInputs = [
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
      id:"email",
      name:"email",
      type:"email",
      label:"Email",
      disabled:false,
      as:'input',
    },
    {
      id:"password",
      name:"password",
      type:"password",
      label:"Mot de passe",
      disabled:false,
      as:'input',
    }
  ];
  export const basicProfileConf = 
  {
    type:"submit",
    variant:"outline",
    name:"S'enregistrer",
    call:"POST", // quel call ?
    endpoint:"/api/auth/register", // quel endpoint?
    redirect:"/login" // où redirige?
  } as const;


    /*{
      id:"birthDate",
      name:"birthDate",
      type:"date",
      label:"Date de naissance",
      disabled:false,
      as:'input',
    },*/