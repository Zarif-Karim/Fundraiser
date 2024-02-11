import { UserStore } from '../user';
import { RedisStorage } from '../redis';
import { User } from '../../components/user';

jest.mock('../redis');

const store = new RedisStorage();

describe('UserStore', () => {
    const userStore = new UserStore(store);
    const dummyUser = new User(
        '1',
        'John Doe',
        'john@example.com',
        '1234567890',
        '123 Main St',
    );

    describe('create', () => {
        it.each([
            [true, ''],
            [false, 'not '],
        ])('returns %s if the user is %screated', async (val, _) => {
            // Arrange
            store.add = jest.fn().mockResolvedValue(val);
            // Act
            const success = await userStore.create(dummyUser);
            // Assert
            expect(success).toBe(val);
        });
    });
});
