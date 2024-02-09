import { User } from '../components/user';
import { RedisStorage } from './redis';

export class UserStore {
  constructor(private store: RedisStorage) {}

  async create(user: User) {
    return await this.store.add('users', JSON.stringify(user.info()));
  }

  getUsers() {

  }
}
