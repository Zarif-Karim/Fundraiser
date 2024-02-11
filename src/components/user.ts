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

    info(): { [key: string]: string } {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            address: this.address || '',
        };
    }
}
