export type CreateUserData = {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    password?: string;
}

export type PetCardProps = {
  id: string | number;
  name: string;
  type: string;
  race?: string | null;
  photoUrl?: string | null;
  info?: string | null;
  isOwner?: boolean;
};

export type EditUserData = {
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    bio?: string;
    birth?: Date;
    pets?: PetCardProps[];
}