export interface User {
    id: string;
    first_name: string;
    last_name: string;
    avatar: string;
    birthday?: string;
    phone_number?: string;
    email: string;
    is_email_verified: boolean;
    is_phone_number_verified: boolean;
    last_login: string;
}
