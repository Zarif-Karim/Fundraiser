import request from 'supertest';
import server from '../../../app';
import { noConsoleLogForTest } from '../../../utils/testUtils';

noConsoleLogForTest();

afterEach((done) => {
    server.close();
    done();
});

describe('User Routes', () => {
    describe('create', () => {
        it('POST /api/v1/user/create - should return 201 with user info when user created', async () => {
            const userData = {
                name: 'John Doe',
                email: 'john@email.com',
                phone: '1234567890',
                address: '123 Main St',
            };
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

    describe('get', () => {
        it('GET /api/v1/user/:id - should return 200 with user info when user found', async () => {
            // create a user
            const userData = {
                name: 'John Doe',
                email: 'john@email.com',
                phone: '1234567890',
                address: '123 Main St',
            };

            const createResponse = await request(server)
                .post('/api/v1/user/create')
                .send(userData);

            // get the user
            const response = await request(server).get(
                `/api/v1/user/${createResponse.body.id}`,
            );

            expect(response.status).toEqual(200);
            expect(response.body).toEqual(createResponse.body);
        });
    });
});
