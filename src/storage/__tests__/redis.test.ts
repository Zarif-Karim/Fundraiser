import { RedisStorage } from '../redis';

let storage: RedisStorage;
const keysToRemove: string[] = [];

beforeAll(async () => {
  storage = new RedisStorage();
});

afterAll(async () => {
  await storage.batchRemove(keysToRemove);
  await storage.disconnect();
});

describe('get', () => {
  it('should return an empty array if no values are found', async () => {
    const key = 'no-stored-value';
    const values = await storage.get(key);
    expect(values).toEqual([]);
  });

  it('should return an array of values if values are found', async () => {
    const key = 'test-key-insert';
    await storage.add(key, 'value-1');
    await storage.add(key, 'value-2');
    const values = await storage.get(key);
    expect(values).toEqual(['value-1', 'value-2']);
    keysToRemove.push(key);
  });
});
