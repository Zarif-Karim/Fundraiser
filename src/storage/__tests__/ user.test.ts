import { UserStore } from '../user';
import { PostgresClient } from '../postgres';
import { User } from '../../components/user';
import config from '../../config';

const store = new PostgresClient(config.POSTGRES);

// TODO: need to fix test logic
describe.skip('UserStore', () => {
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
            // const success = await userStore.create(dummyUser);
            // Assert
            // expect(success).toBe(val);
        });
    });

    describe('get', () => {
        it('calls the store with the provided id', async () => {
            // Arrange
            store.get = jest.fn().mockResolvedValue({});
            // Act
            await userStore.get('1');
            // Assert
            expect(store.get).toHaveBeenCalledWith('users:1');
        });

        it('returns undefined if the user is not found', async () => {
            // Arrange
            store.get = jest.fn().mockResolvedValue({});
            // Act
            const user = await userStore.get('1');
            // Assert
            expect(user).toBeUndefined();
        });

        it('returns the user if found', async () => {
            // Arrange
            // store.get = jest.fn().mockResolvedValue(dummyUser.info());
            // Act
            // const user = await userStore.get('1');
            // Assert
            // expect(user).toEqual(dummyUser.info());
        });
    });
});
