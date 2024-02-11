import { UserService } from '../user';
import { UserStore } from '../../storage/user';

jest.mock('../../storage/user');

describe('UserService', () => {
    const mockUserStore = new UserStore({} as any);
    const userService = new UserService(mockUserStore);

    describe('create', () => {
        it('should throw an error if id is not provided', async () => {
            await expect(
                userService.create('name', 'email', 'phone', 'address'),
            ).rejects.toThrow('id is required');
        });

        it('should throw an error if user creation fails', async () => {
            mockUserStore.create = jest.fn().mockResolvedValue(false);
            await expect(
                userService.create('name', 'email', 'phone', 'address', 'id'),
            ).rejects.toThrow('Failed to create user');
        });

        it('should return the user if creation is successful', async () => {
            mockUserStore.create = jest.fn().mockResolvedValue(true);
            const user = await userService.create(
                'name',
                'email',
                'phone',
                'address',
                'id',
            );
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
