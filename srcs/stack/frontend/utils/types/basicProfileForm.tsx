  export const basicProfileFormInputs = [
    {
      id:"firstname",
      name:"firstname",
      type:"name",
      label:"Prénom"
    },
    {
      id:"lastname",
      name:"lastname",
      type:"name",
      label:"Nom"
    },
    {
      id:"username",
      name:"username",
      type:"username",
      label:"Pseudo"
    },
    {
      id:"email",
      name:"email",
      type:"email",
      label:"Email"
    },
    {
      id:"password",
      name:"password",
      type:"password",
      label:"Mot de passe"
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