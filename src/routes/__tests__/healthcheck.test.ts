import server from '../../app';
import request from 'supertest';

afterEach((done) => {
  server.close();
  done();
});

describe('Healthcheck', () => {
  it('should return 200', async () => {
    const response = await request(server).get('/healthcheck');
    expect(response.status).toEqual(200);
  });

  it('should return ok in the body', async () => {
    const response = await request(server).get('/healthcheck');
    expect(response.text).toEqual('ok');
  });
});
