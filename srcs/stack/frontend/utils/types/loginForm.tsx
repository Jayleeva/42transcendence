  export const loginFormInputs = [
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
  export const loginFormConf =
    {
    type:"submit",
    variant:"outline",
    name:"Se connecter",
    call:"POST",
    endpoint:"/api/auth/login",
    redirect:"/feed"
  } as const;