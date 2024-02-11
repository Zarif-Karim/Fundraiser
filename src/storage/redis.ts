import config from '../config';
import { IStorage, IStorageKey, IStorageValue } from './types';
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

    async get(key: IStorageKey): Promise<IStorageValue> {
        if (!this.client) await this.connect();

        try {
            const values = await this.client.hGetAll(key);
            return values;
        } catch (error) {
            this.logger.error({
                error,
                operation: 'RedisStorage.get',
            });
            return {};
        }
    }

    async add(key: IStorageKey, value: IStorageValue): Promise<boolean> {
        if (!this.client) await this.connect();

        try {
            const successCount = await this.client.hSet(key, value);
            return successCount > 0;
        } catch (error) {
            this.logger.error({
                error,
                operation: 'RedisStorage.add',
            });
            return false;
        }
    }

    async update(key: IStorageKey, value: IStorageValue): Promise<boolean> {
        if (!this.client) await this.connect();

        try {
            const jobs: Promise<number>[] = [];
            for (const field in value) {
                jobs.push(this.client.hSet(key, field, value[field]));
            }
            await Promise.all(jobs);
            return true;
        } catch (error) {
            this.logger.error({
                error,
                operation: 'RedisStorage.update',
            });
            return false;
        }
    }

    async remove(key: IStorageKey): Promise<boolean> {
        if (!this.client) await this.connect();

        try {
            const successCount = await this.client.del(key);
            return successCount > 0;
        } catch (error) {
            this.logger.error({
                error,
                operation: 'RedisStorage.remove',
            });
            return false;
        }
    }

    async batchRemove(key: IStorageKey[]) {
        if (!this.client) await this.connect();

        try {
            const successCount = await this.client.del(key);
            return successCount === key.length;
        } catch (error) {
            this.logger.error({
                error,
                key,
                operation: 'RedisStorage.batchRemove',
            });
            return false;
        }
    }
}
