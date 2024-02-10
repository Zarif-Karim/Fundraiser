import request from 'supertest';
import server from '../../../app';

afterEach((done) => {
  server.close();
  done();
});

describe('User Routes', () => {
  describe('create', () => {
    it('POST /api/v1/user/create - should return 201 with user info when user created', async () => {
      const userData = {
        id: '1',
        name: 'John Doe',
        email: 'john@email.com',
        phone: '1234567890',
        address: '123 Main St',
      };
      const response = await request(server)
        .post('/api/v1/user/create')
        .send(userData);

      expect(response.status).toEqual(201);
      expect(response.body).toEqual(userData);
    });
  });
});
