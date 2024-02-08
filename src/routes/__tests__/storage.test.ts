import server from '../../app';
import request from 'supertest';

afterEach((done) => {
  server.close();
  done();
});

describe('Storage', () => {
  it.each(['/storage', '/storage/healthcheck'])(
    'should return 200 with ok on heartbeat - %s',
    async (link) => {
      const response = await request(server).get(link);
      expect(response.status).toEqual(200);
      expect(response.text).toEqual('ok');
    },
  );
});
