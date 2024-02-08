class User {
  // unique identifier
  id: string;

  // user's name
  name: string;

  // user's email
  email: string;

  // user's address
  address?: string;

  // user's phone number
  phone?: string;

  constructor(
    id: string,
    name: string,
    email: string,
    address: string,
    phone: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
  }

  info() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      address: this.address,
      phone: this.phone,
    };
  }
}
