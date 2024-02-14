import { User } from '../components/user';
import { RedisStorage } from './redis';
import { IStorageValue } from './types';

const isEmptyObject = (obj: Object) => {
    return !obj || Object.keys(obj).length === 0;
};

export class UserStore {
    prefixKey = 'users';
    constructor(private store: RedisStorage) {}

    private createKey(key: string) {
        return `${this.prefixKey}:${key}`;
    }

    async create(user: User): Promise<boolean> {
        return await this.store.add(this.createKey(user.id), user.info());
    }

    async get(id: string): Promise<IStorageValue | undefined> {
        const user = await this.store.get(this.createKey(id));
        if (isEmptyObject(user)) {
            return undefined;
        }
        return user;
    }
}
