import request from 'supertest';
import server from '../../../app';
import { noConsoleLogForTest } from '../../../utils/testUtils';
import { uuidv4 } from 'lib0/random';
import { User } from '../../../components/user';

noConsoleLogForTest();

const createRandomUserData = () => {
    const uniqueId = uuidv4();
    const userData = {
        name: `John Tester`,
        email: `createUnique-${uniqueId}-@email-test.com`,
        phone: '1234567890',
        address: '123 Main St',
    };
    return userData;
};

afterEach((done) => {
    server.close();
    done();
});

describe('User Routes', () => {
    describe('create', () => {
        it('POST /api/v1/user/create - should return 201 with user info when user created', async () => {
            const userData = createRandomUserData();
            const response = await request(server)
                .post('/api/v1/user/create')
                .send(userData);

            expect(response.status).toEqual(201);
            expect(response.body).toEqual({
                ...userData,
                id: expect.any(String),
            });
        });
    });

    describe('update', () => {
        it('PUT /api/v1/user/id/:id - should return 200 with user info when user updated', async () => {
            const userData = createRandomUserData();
            const createdUser = await request(server)
                .post('/api/v1/user/create')
                .send(userData);
            expect(createdUser.status).toEqual(201);

            const updatedUserData = {
                ...createdUser.body,
                name: 'John Updated',
                phone: '0987654321',
                address: '321 Main St',
            };
            const updateResponse = await request(server)
                .put(`/api/v1/user/id/${createdUser.body.id}`)
                .send(updatedUserData);

            expect(updateResponse.status).toEqual(200);
            expect(updateResponse.body).toEqual(updatedUserData);
        });

        it('PUT /api/v1/user/email/:email - should return 200 with user info when user updated', async () => {
            const userData = createRandomUserData();
            const createdUser = await request(server)
                .post('/api/v1/user/create')
                .send(userData);
            expect(createdUser.status).toEqual(201);

            const updatedUserData = {
                ...createdUser.body,
                name: 'John Updated',
                phone: '0987654321',
                address: '321 Main St',
            };
            const updateResponse = await request(server)
                .put(`/api/v1/user/email/${createdUser.body.email}`)
                .send(updatedUserData);

            expect(updateResponse.status).toEqual(200);
            expect(updateResponse.body).toEqual(updatedUserData);
        });
    });

    describe('get', () => {
        // generated user data to be used in get tests
        let userData: User;

        beforeAll(async () => {
            const randomUserData = createRandomUserData();
            const response = await request(server)
                .post('/api/v1/user/create')
                .send(randomUserData);
            expect(response.status).toEqual(201);
            userData = response.body;
        });

        describe('by id', () => {
            it('GET /api/v1/user/id/:id - should return 200 with user info when user found', async () => {
                const response = await request(server).get(
                    `/api/v1/user/id/${userData.id}`,
                );

                expect(response.status).toEqual(200);
                expect(response.body).toEqual(userData);
            });

            it('GET /api/v1/user/id/:id - should return 404 user not found', async () => {
                const noUserId = 'bogus-id';
                const response = await request(server).get(
                    `/api/v1/user/id/${noUserId}`,
                );

                expect(response.status).toEqual(404);
                expect(response.body).toEqual({ message: 'User not found' });
            });
        });

        describe('by email', () => {
            it('GET /api/v1/user/email/:email - should return 200 with user info when user found', async () => {
                const response = await request(server).get(
                    `/api/v1/user/email/${userData.email}`,
                );

                expect(response.status).toEqual(200);
                expect(response.body).toEqual(userData);
            });

            it('GET /api/v1/user/email/:email - should return 404 user not found', async () => {
                const noUserEmail = 'bogus-email';
                const response = await request(server).get(
                    `/api/v1/user/email/${noUserEmail}`,
                );

                expect(response.status).toEqual(404);
                expect(response.body).toEqual({ message: 'User not found' });
            });
        });
    });
});
