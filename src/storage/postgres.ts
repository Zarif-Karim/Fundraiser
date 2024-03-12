import type { PostgresGetPayload } from './types';
import {
    type DatabasePool,
    createPool,
    sql,
    Query,
    QuerySqlToken,
} from 'slonik';
import type { IPostgresConfig } from '../config';
import { Logger } from '../utils/logger';

// export class PostgresClient implements IStorage {
export class PostgresClient {
    private pool!: DatabasePool;
    constructor(
        private config: IPostgresConfig,
        private logger: Logger = console,
    ) {}

    async connect() {
        if (this.pool) return;

        this.logger.info('[POSTGRES]: Starting connection');
        const { host, port, username, password, database } = this.config;
        const connectionString = `postgresql://${username}:${password}@${host}:${port}/${database}`;
        console.log('[POSTGRES]: connectionString:', connectionString);
        this.pool = await createPool(connectionString);
        this.logger.info('[POSTGRES]: Connection established');
    }

    async get(query: QuerySqlToken): Promise<PostgresGetPayload> {
        await this.connect();

        try {
            const result = await this.pool.one(query);
            return result;
        } catch (error) {
            this.logger.error({
                error,
                operation: 'PostgresClient.get',
            });
            return undefined;
        }
    }

    // only for debugging purposes
    async getAllFromTable(
        query: QuerySqlToken,
    ): Promise<readonly PostgresGetPayload[]> {
        await this.connect();

        try {
            const result = await this.pool.any(query);
            console.log('getAllFromTable', result);
            return result;
        } catch (error) {
            this.logger.error({
                error,
                operation: 'PostgresClient.getAll',
            });
            return [];
        }
    }

    async add(query: QuerySqlToken): Promise<boolean> {
        await this.connect();

        try {
            await this.pool.query(query);
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
