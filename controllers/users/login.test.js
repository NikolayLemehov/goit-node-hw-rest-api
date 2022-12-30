const express = require('express');
const request = require('supertest');
const login = require('./login');

const app = express();

app.get('/api/contacts', login);

let server;
// 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;
describe('test login.js controller', () => {

  beforeAll((done) => {
    server = app.listen(3000, done);
  });
  afterAll((done) => server.close(done));

  test('login.js test', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .send({
        email: "mail04@.mail.com",
        password: "12341234",
      })
      .set('Content-type', 'application/json')
      .expect(200);
    // console.log(response);
    expect(res.body.query.order).toStrictEqual([
      { id: 'Foo.bar', desc: false },
      { id: 'Foo.foo', desc: true },
    ]);
    expect(res.body.query.measures).toStrictEqual(['Foo.bar']);
  });
});
