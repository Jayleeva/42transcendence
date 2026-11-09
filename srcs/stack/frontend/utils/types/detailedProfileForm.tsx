  export const detailedProfileAvatar = {
//<Avatar src="/Placeholder-test.png" alt="Test Avatar"></Avatar>
  }
  
  export const detailedProfileBio = {
//            <div>
//                <Textarea id="bio" name="bio" placeholder="Écrivez quelque chose à propos de vous..." maxLength={300} />
//            </div>
  }

  export const detailedProfileFormInputs = [
    {
      id:"firstname",
      name:"firstname",
      type:"name",
      label:"Prénom",
      disabled:false
    },
    {
      id:"lastname",
      name:"lastname",
      type:"name",
      label:"Nom",
      disabled:false
    },
    {
      id:"username",
      name:"username",
      type:"username",
      label:"Pseudo",
      disabled:false
    },
    {
      id:"birth",
      name:"birth",
      type:"date",
      label:"Date de naissance",
      disabled:false
    },
    {
      id:"email",
      name:"email",
      type:"email",
      label:"Email",
      disabled:true
    },
  ];

  export const detailedProfilePassword = [
    {
      id:"oldpassword",
      name:"oldpassword",
      type:"password",
      label:"Ancien mot de passe",
      disabled:false
    },
    {
      id:"newpassword",
      name:"newpassword",
      type:"password",
      label:"Nouveau mot de passe",
      disabled:false
    },
    {
      id:"confpassword",
      name:"confpassword",
      type:"password",
      label:"Confirmer le nouveau mot de passe",
      disabled:false
    }
  ];

  export const detailedProfileConf = 
  {
    type:"submit",
    variant:"outline",
    name:"Valider les modifications",
    call:"PATCH",
    endpoint:"/api/users/me",
  } as const;

    export const modPasswordConf = 
  {
    type:"submit",
    variant:"outline",
    name:"Valider les modifications",
    call:"PATCH",
    endpoint:"/api/auth/password",
  } as const;