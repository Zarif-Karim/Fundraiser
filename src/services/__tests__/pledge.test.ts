import request from 'supertest';
import server from '../../app';

describe('Pledge', () => {
  it('should return 200', async () => {
    const response = await request(server).get('/pledge');
    expect(response.status).toEqual(200);
  });

  it('should return ok in the body', async () => {
    const response = await request(server).get('/pledge');
    expect(response.text).toEqual('ok');
  });
});
