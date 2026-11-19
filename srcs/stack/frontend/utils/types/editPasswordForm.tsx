  export const editPasswordFormInputs = [
    {
      id:"currentPassword",
      name:"currentPassword",
      type:"password",
      label:"Ancien mot de passe",
      disabled:false,
      as:'input',
    },
    {
      id:"newPassword",
      name:"newPassword",
      type:"password",
      label:"Nouveau mot de passe",
      disabled:false,
      as:'input',
    },
    {
      id:"confPassword",
      name:"confPassword",
      type:"password",
      label:"Confirmer le nouveau mot de passe",
      disabled:false,
      as:'input',
    }
  ];

export const editPasswordFormConf = 
  {
    type:"submit",
    variant:"outline",
    name:"Valider les modifications",
    call:"PATCH",
    endpoint:"/api/auth/password",
  } as const;
