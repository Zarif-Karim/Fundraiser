import { UserService } from '../user';
import { UserStore } from '../../storage/user';

jest.mock('../../storage/user');

const mockUser = {
    name: 'Thanos',
    phone: '4213',
    email: 'halfEarth@world.com',
    address: 'some corner mountain',
};

describe('UserService', () => {
    const mockUserStore = new UserStore({} as any);
    const userService = new UserService(mockUserStore);

    describe('create', () => {
        it('should throw an error if user creation fails', async () => {
            mockUserStore.create = jest.fn().mockResolvedValue(false);
            await expect(userService.create(mockUser)).rejects.toThrow(
                'Failed to create user',
            );
        });

        it('should return the user if creation is successful', async () => {
            mockUserStore.create = jest
                .fn()
                .mockResolvedValue({ ...mockUser, id: 'blah' });
            const user = await userService.create(mockUser);
            expect(user).toEqual({
                id: expect.any(String),
                ...mockUser,
            });
        });
    });

    describe('get', () => {
        it('should throw an error if user is not found', async () => {
            mockUserStore.get = jest.fn().mockResolvedValue(undefined);
            await expect(userService.get('id')).rejects.toThrow(
                'User not found',
            );
        });

        it('should call the user store with the provided id', async () => {
            mockUserStore.get = jest.fn().mockResolvedValue({});
            await userService.get('id');
            expect(mockUserStore.get).toHaveBeenCalledWith('id');
        });

        it('should return the user if found', async () => {
            mockUserStore.get = jest.fn().mockResolvedValue({
                id: 'id',
                name: 'name',
                email: 'email',
                phone: 'phone',
                address: 'address',
            });
            const user = await userService.get('id');
            expect(user).toEqual({
                id: 'id',
                name: 'name',
                email: 'email',
                phone: 'phone',
                address: 'address',
            });
        });
    });
});
