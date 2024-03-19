import type { PostgresGetPayload } from './types';
import { type DatabasePool, createPool, sql, QuerySqlToken } from 'slonik';
import type { IPostgresConfig } from '../config';
import { Logger } from '../utils/logger';
import { migrations } from './migrations';

// export class PostgresClient implements IStorage {
export class PostgresClient {
    private pool!: DatabasePool;
    constructor(
        private config: IPostgresConfig,
        private logger: Logger = console,
    ) {}

    // Should only run once for the very first operation.
    async connect() {
        if (this.pool) return;

        this.logger.info('[POSTGRES]: Starting connection');
        const { host, port, username, password, database } = this.config;
        const connectionString = `postgresql://${username}:${password}@${host}:${port}/${database}`;
        console.log('[POSTGRES]: connectionString:', connectionString);
        this.logger.info('[POSTGRES]: Establish Connection - STARTED');
        this.pool = await createPool(connectionString);
        this.logger.info('[POSTGRES]: Establish Connection - FINISHED');
        this.logger.info('[POSTGRES]: Running Migrations - STARTED');
        await this.runMigrations();
        this.logger.info('[POSTGRES]: Running Migrations - COMPLETED');
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
            return await this.pool.any(query);
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

    async update(query: QuerySqlToken): Promise<boolean> {
        await this.connect();

        try {
            const result = await this.pool.query(query);
            return result.rowCount === 1;
        } catch (error) {
            this.logger.error({
                error,
                operation: 'PostgresClient.update',
            });
            return false;
        }
    }

    async runMigrations(): Promise<void> {
        await this.connect();

        let migrationNumber = 1;
        try {
            for (let mg of migrations) {
                await this.pool.query(mg);
                migrationNumber += 1;
            }
        } catch (error) {
            this.logger.error({
                error,
                failedQueryNo: migrationNumber,
                operation: 'PostgresClient.runMigrations',
            });
            throw error;
        }
    }

    async disconnect() {
        if (!this.pool) return;

        this.logger.info('[POSTGRES]: Disconnect');
        await this.pool.end();
        this.logger.info('[POSTGRES]: Disconnected');
    }
}
