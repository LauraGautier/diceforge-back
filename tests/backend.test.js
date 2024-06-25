import request from 'supertest';
import app from '../index';

let server;

beforeAll(() => {
  process.env.PORT = 3001;
  server = app.listen(process.env.PORT);
});

afterAll(() => {
  server.close();
});

test('POST /api/login should return a successful login response', async () => {
  const res = await request(app)
    .post('/api/login')
    .send({ email: "lc.gautier@icloud.com", password: "Banane5" });

  expect(res.status).toBe(200);
  expect(res.body.message).toBe('Authentification réussie');
});