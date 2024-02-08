import { RedisStorage } from '../redis';
import { createClient } from 'redis';
import config from '../../config';

let client: ReturnType<typeof createClient>;
let storage: RedisStorage;
const keysToRemove: string[] = [];

beforeAll(async () => {
  client = await createClient(config.REDIS)
    .on('error', (error) => console.error(error))
    .connect();
  storage = new RedisStorage(client);
});

afterAll(async () => {
  await client.del(keysToRemove);
  await client.disconnect();
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
