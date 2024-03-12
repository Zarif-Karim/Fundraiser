import { UserTablePayload } from '../storage/types';

export class User {
    // unique identifier
    id: string;

    // user's name
    name: string;

    // user's email
    email: string;

    // user's phone number
    phone: string;

    // user's address
    address?: string;

    constructor(
        id: string,
        name: string,
        email: string,
        phone: string,
        address?: string,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
    }

    static info(user: User): { [key: string]: string } {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address || '',
        };
    }

    static fromDatabase(data: UserTablePayload): User {
        return new User(
            data.id,
            data.name,
            data.email,
            data.phone,
            data.address,
        );
    }
}
