export interface User {
    id: string;
    first_name: string;
    last_name: string;
    avatar?: string | null;
    birthday?: string | null;
    phone_number?: string;
    email: string;
    is_email_verified: boolean;
    is_phone_number_verified: boolean;
    last_login: string;
}

export const deafultUser = {
    id: "",
    first_name: "",
    last_name: "",
    avatar: null,
    birthday: null,
    phone_number: "",
    email: "",
    is_email_verified: false,
    is_phone_number_verified: false,
    last_login: "",
};

export interface UserContact {
    id: string;
    user: User;
    contacts: User[];
}

export const defaultContact = {
    id: "",
    user: {
        id: "",
        first_name: "",
        last_name: "",
        avatar: null,
        birthday: null,
        phone_number: "",
        email: "",
        is_email_verified: false,
        is_phone_number_verified: false,
        last_login: "",
    },
    contacts: [],
};
