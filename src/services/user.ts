import { User } from '../components/user';
import { UserStore } from '../storage/user';

export class UserService {
    constructor(private readonly userStore: UserStore) {}

    async get(id: string): Promise<User | undefined> {
        const userData = await this.userStore.get(id);

        if (!userData) {
            throw new Error('User not found');
        }

        return User.fromDatabase(userData);
    }

    async create(
        name: string,
        email: string,
        phone: string,
        address?: string,
        id?: string,
    ): Promise<User> {
        if (!id) {
            throw new Error('id is required');
        }

        const user = new User(id, name, email, phone, address);
        const success = await this.userStore.create(user);
        if (!success) {
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
