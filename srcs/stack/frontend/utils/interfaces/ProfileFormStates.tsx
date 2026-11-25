
export interface StudentProfileFormState {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    avatar?: string;
    bio?: string;
    birthDate?: string;
}

export interface PetProfileFormState {
    name: string;
    type: string;
    race: string;
    avatar: string;
    bio: string;
    birthDate?: string;
}
