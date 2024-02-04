export interface IStorage {
    get: (key: string) => Promise<string[]>;
    add: (key: string, value: string) => Promise<boolean>;
    remove: (key: string, value: string) => Promise<boolean>;
}