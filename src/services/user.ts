export class UserService {
    constructor(
        // TODO: implement store
        private readonly userStore: any
    ) {}

  async get(id: string) {
    return;
  }

  async create(name: string, email: string, phone: string, address?: string, id?: string): Promise<User> {
    if(!id) {
        throw new Error('id is required');
    }

    const user = new User(id, name, email, phone, address);
    const result = await this.userStore.create(user.info());
    if(!result.ok) {
        throw new Error('Failed to create user');
    }

    return user;
  }

  async update(id: string, user: User) {
    return;
  }

  async delete(id: string) {
    return;
  }

  async batchGet(ids: string[]) {
    return;
  }

  async getByEmail(email: string) {
    // make a call to the database

    // return the user if found

    // return undefined if not found
    return undefined;
  }
}
