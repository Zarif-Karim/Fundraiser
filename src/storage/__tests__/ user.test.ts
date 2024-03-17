import { UserStore } from '../user';
import { PostgresClient } from '../postgres';
import { User } from '../../components/user';
import config from '../../config';

jest.mock('../postgres');
const store = new PostgresClient(config.POSTGRES);

describe('UserStore', () => {
    afterEach(jest.clearAllMocks);

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
            ['user', '', true, dummyUser],
            ['undefined', 'not ', false, undefined],
        ])('returns %s if %screated', async (__, _, storeRet, toExpect) => {
            // Arrange
            jest.spyOn(store, 'add').mockResolvedValue(storeRet);
            // Act
            const result = await userStore.create(dummyUser.id, dummyUser);
            // Assert
            expect(result).toEqual(toExpect);
        });
    });

    describe('get - id', () => {
        it('calls the store with the provided id', async () => {
            // Arrange
            const getSpy = jest.spyOn(store, 'get');
            // Act
            await userStore.get('1');
            // Assert
            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy.mock.calls[0][0].values).toEqual(['1']);
        });

        it('returns undefined if the user is not found', async () => {
            // Arrange
            store.get = jest.fn().mockResolvedValue(undefined);
            // Act
            const user = await userStore.get('1');
            // Assert
            expect(user).toBeUndefined();
        });

        it('returns the user if found', async () => {
            // Arrange
            store.get = jest.fn().mockResolvedValue(User.info(dummyUser));
            // Act
            const user = await userStore.get('1');
            // Assert
            expect(user).toEqual(dummyUser);
        });
    });

    describe('get - email', () => {
        it('calls the store with the provided id', async () => {
            // Arrange
            const getSpy = jest.spyOn(store, 'get');
            // Act
            await userStore.getByEmail('1');
            // Assert
            expect(getSpy).toHaveBeenCalledTimes(1);
            expect(getSpy.mock.calls[0][0].values).toEqual(['1']);
        });

        it('returns undefined if the user is not found', async () => {
            // Arrange
            store.get = jest.fn().mockResolvedValue(undefined);
            // Act
            const user = await userStore.getByEmail('1');
            // Assert
            expect(user).toBeUndefined();
        });

        it('returns the user if found', async () => {
            // Arrange
            store.get = jest.fn().mockResolvedValue(User.info(dummyUser));
            // Act
            const user = await userStore.getByEmail('1');
            // Assert
            expect(user).toEqual(dummyUser);
        });
    });
});
