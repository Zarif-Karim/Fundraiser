import { RedisStorage } from '../redis';
import { User } from '../../components/user';
import { noConsoleLogForTest } from '../../utils/testUtils';

noConsoleLogForTest();

let redisStorage: RedisStorage;
const keysToRemove: string[] = [];

const createKey = (key: string) => {
    const prefixedKey = `test:${key}`;
    keysToRemove.push(prefixedKey);
    return prefixedKey;
};

beforeAll(() => {
    redisStorage = new RedisStorage();
});

afterAll(async () => {
    await redisStorage.disconnect();
});

afterEach(async () => {
    if (keysToRemove.length === 0) return;

    await redisStorage.batchRemove(keysToRemove);
    keysToRemove.length = 0;
});

describe('RedisStorage', () => {
    describe('add', () => {
        it('returns true if the key is created', async () => {
            const key = createKey('test-key-1');
            const value = new User(
                key,
                'name',
                'email',
                'phone',
                'address',
            ).info();
            const success = await redisStorage.add(key, value);
            expect(success).toBe(true);

            const result = await redisStorage.get(key);
            expect(result).toEqual(value);
        });
    });

    describe('update', () => {
        it('returns true if the key is updated', async () => {
            const key = createKey('test-key-1');
            const value = new User(
                key,
                'name',
                'email',
                'phone',
                'address',
            ).info();
            await redisStorage.add(key, value);

            const updatedValue = {
                email: 'new-email',
            };
            const success = await redisStorage.update(key, updatedValue);
            expect(success).toBe(true);

            const result = await redisStorage.get(key);
            expect(result).toEqual({
                ...value,
                ...updatedValue,
            });
        });
    });

    describe('get', () => {
        it('returns the value for a key', async () => {
            const key = createKey('test-key-2');
            const value = { test: 'value' };
            await redisStorage.add(key, value);
            const result = await redisStorage.get(key);
            expect(result).toEqual(value);
        });

        it('returns an empty object if the key does not exist', async () => {
            const key = 'test-key-3';
            const result = await redisStorage.get(key);
            expect(result).toEqual({});
        });
    });

    describe('remove', () => {
        it('returns true if the key is removed', async () => {
            const key = 'test-key-4';
            const value = { test: 'value' };
            await redisStorage.add(key, value);

            const success = await redisStorage.remove(key);
            expect(success).toBe(true);

            const result = await redisStorage.get(key);
            expect(result).toEqual({});
        });
    });

    describe('batchRemove', () => {
        it('returns true if all keys are removed', async () => {
            const key1 = 'test-key-5';
            const value1 = { test: 'value' };
            await redisStorage.add(key1, value1);

            const key2 = 'test-key-6';
            const value2 = { test: 'value' };
            await redisStorage.add(key2, value2);

            const success = await redisStorage.batchRemove([key1, key2]);
            expect(success).toBe(true);

            const result1 = await redisStorage.get(key1);
            expect(result1).toEqual({});
            const result2 = await redisStorage.get(key2);
            expect(result2).toEqual({});
        });
    });
});
