import { User } from '../components/user';
import { RedisStorage } from './redis';

export class UserStore {
  prefixKey = 'users';
  constructor(private store: RedisStorage) {}

  private createKey(key: string) {
    return `${this.prefixKey}:${key}`;
  }

  async create(user: User) {
    return await this.store.add(
      this.createKey(user.id),
      JSON.stringify(user.info()),
    );
  }

  getUsers() {}
}
