import test from 'ava';
import request from 'supertest';
import app from '../index.js';

let server;

test.before('setup', async t => {
  process.env.PORT = 5001;
  server = app.listen(process.env.PORT);
});

test.after.always('cleanup', async t => {
  server.close();
});

test('POST /api/login should return a successful login response', async test => {
  const res = await request(app)
    .post('/api/login')
    .send({ email:"jeremie.rocquet@outlook.fr", password: "Dn1" });

  test.is(res.status, 200);
  test.is(res.body.message, 'Authentification réussie');
});
