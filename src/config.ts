interface IConfig {
    PORT: number;
    CORS: {
        origin: string;
    },
    REDIS: {
        url: string
    }
}

const config: IConfig = {
    PORT: Number(process.env.PORT) || 3000,
    CORS: {
        origin: '*'
    },
    REDIS: {
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    }
}

export default config;