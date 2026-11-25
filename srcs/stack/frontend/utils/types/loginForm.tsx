  export const loginFormInputs = [
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
  export const loginFormConf =
    {
    type:"submit",
    variant:"outline",
    name:"Se connecter",
    call:"POST",
    endpoint:"/api/auth/login",
    redirect:"/feed"
  } as const;