import config from '../config';
import { IStorage } from './types';
import { createClient } from 'redis';

export class RedisStorage implements IStorage {
  private client!: ReturnType<typeof createClient>;
  constructor(private logger: Console = console) {}

  private async connect() {
    this.client = await createClient(config.REDIS)
      .on('error', (error) => this.logger.error(error))
      .connect();
  }

  async disconnect() {
    await this.client.disconnect();
  }

  async get(key: string): Promise<string[]> {
    if (!this.client) await this.connect();

    try {
      const values = await this.client.lRange(key, 0, -1);
      return values;
    } catch (error) {
      this.logger.error({
        error,
        operation: 'RedisStorage.get',
      });
      return [];
    }
  }

  async add(key: string, value: string): Promise<boolean> {
    if (!this.client) await this.connect();

    try {
      const successCount = await this.client.rPush(key, value);
      return successCount > 0;
    } catch (error) {
      this.logger.error({
        error,
        operation: 'RedisStorage.add',
      });
      return false;
    }
  }

  async remove(key: string, value: string): Promise<boolean> {
    if (!this.client) await this.connect();

    try {
      const successCount = await this.client.lRem(key, 0, value);
      return successCount > 0;
    } catch (error) {
      this.logger.error({
        error,
        operation: 'RedisStorage.remove',
      });
      return false;
    }
  }

  async batchRemove(key: string[]) {
    if (!this.client) await this.connect();

    try {
      const successCount = await this.client.del(key);
      return successCount > 0;
    } catch (error) {
      this.logger.error({
        error,
        operation: 'RedisStorage.batchRemove',
      });
      return false;
    }
  }
}
