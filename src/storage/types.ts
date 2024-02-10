export type IStorageKey = string;
export type IStorageValue = { [key: string]: string | number };

export interface IStorage {
  get: (key: IStorageKey) => Promise<IStorageValue>;
  add: (key: IStorageKey, value: IStorageValue) => Promise<boolean>;
  remove: (key: IStorageKey) => Promise<boolean>;
}
