export interface IStorage {
  get: (key: string) => Promise<string[]>;
  add: (key: string, value: { [key: string]: string | number }) => Promise<boolean>;
  remove: (key: string, value: string) => Promise<boolean>;
}
