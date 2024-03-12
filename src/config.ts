export interface IPostgresConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export interface IConfig {
    PORT: number;
    CORS: {
        origin: string;
    };
    REDIS: {
        url: string;
    };
    POSTGRES: IPostgresConfig;
}

const config: IConfig = {
    PORT: Number(process.env.PORT) || 3000,
    CORS: {
        origin: '*',
    },
    REDIS: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
    },
    POSTGRES: {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: Number(process.env.POSTGRES_PORT) || 5432,
        username: process.env.POSTGRES_USERNAME || 'zkarim',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_DB || 'fundraiser',
    },
};

export default config;
