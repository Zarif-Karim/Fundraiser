import { uuidv4 } from 'lib0/random';
import { User } from '../components/user';
import { UserStore } from '../storage/user';

export class UserService {
    constructor(private readonly userStore: UserStore) {}

    async get(id: string): Promise<User | undefined> {
        const user = await this.userStore.get(id);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    // for debugging only: admin use
    async getAll(): Promise<User[]> {
        return await this.userStore.getAll();
    }

    async create(userDetails: Omit<User, 'id'>): Promise<User> {
        const id = uuidv4();

        const user = await this.userStore.create(id, userDetails);
        if (!user) {
            throw new Error('Failed to create user');
        }

        return user;
    }

    async update(id: string, user: User) {
        return;
    }

    async delete(id: string) {
        return undefined;
    }

    async batchGet(ids: string[]) {
        return;
    }

    async getByEmail(email: string) {
        const user = await this.userStore.getByEmail(email);
        return user ? user : undefined;
    }
}
