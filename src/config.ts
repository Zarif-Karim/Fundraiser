interface IConfig {
    PORT: number;
    CORS: {
        origin: string;
    }
}

const config: IConfig = {
    PORT: Number(process.env.PORT) || 3000,
    CORS: {
        origin: '*'
    }
}

export default config;