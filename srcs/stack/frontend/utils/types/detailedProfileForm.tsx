  export const detailedProfileAvatar = {

  }
  
  export const detailedProfileBio = {
    
  }

  export const detailedProfileFormInputs = [
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
      id:"birth",
      name:"birth",
      type:"date",
      label:"Date de naissance"
    },
    {
      id:"email",
      name:"email",
      type:"email",
      label:"Email"
    },
  ];

  export const detailedProfilePassword = [
    {
      id:"oldpassword",
      name:"oldpassword",
      type:"password",
      label:"Ancien mot de passe"
    }
    {
      id:"newpassword",
      name:"newpassword",
      type:"password",
      label:"Nouveau mot de passe"
    }
    {
      id:"confpassword",
      name:"confpassword",
      type:"password",
      label:"Confirmer le nouveau mot de passe"
    }
  ];
  export const detailedProfileConf = 
  {
    type:"submit",
    variant:"outline",
    name:"Valider les modifications",
    call:"PUT", // quel call ?
    endpoint:"/api/auth/register", // quel endpoint?
  } as const;