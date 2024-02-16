import type { PostgresGetPayload } from './types';
import { type DatabasePool, createPool, sql } from 'slonik';
import type { IPostgresConfig } from '../config';
import { Logger } from '../utils/logger';

// export class PostgresClient implements IStorage {
export class PostgresClient {
    private pool!: DatabasePool;
    constructor(
        private config: IPostgresConfig,
        private logger: Logger = console,
    ) {}

    private async connect() {
        if (this.pool) return;

        this.logger.info('[POSTGRES]: Starting connection');
        const { host, port, username, password, database } = this.config;
        const connectionString = `postgresql://${username}:${password}@${host}:${port}/${database}`;
        this.pool = await createPool(connectionString);
        this.logger.info('[POSTGRES]: Connection established');
    }

    async get(query: string, params: any[] = []): Promise<PostgresGetPayload> {
        await this.connect();

        try {
            const result = await this.pool.one(sql.unsafe`${query}`, params);
            return result;
        } catch (error) {
            this.logger.error({
                error,
                operation: 'PostgresClient.get',
            });
            return undefined;
        }
    }

    async add(query: string, params: any[] = []): Promise<boolean> {
        await this.connect();

        try {
            await this.pool.query(sql.unsafe`${query}`, params);
            return true;
        } catch (error) {
            this.logger.error({
                error,
                operation: 'PostgresClient.add',
            });
            return false;
        }
    }

    async update(query: string, params: any[] = []): Promise<boolean> {
        await this.connect();

        try {
            await this.pool.query(sql.unsafe`${query}`, params);
            return true;
        } catch (error) {
            this.logger.error({
                error,
                operation: 'PostgresClient.update',
            });
            return false;
        }
    }

    async disconnect() {
        if (!this.pool) return;

        this.logger.info('[POSTGRES]: Disconnect');
        await this.pool.end();
        this.logger.info('[POSTGRES]: Disconnected');
    }
}
