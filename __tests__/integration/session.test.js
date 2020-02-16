const { User } = require('../../src/app/models');
const request = require('supertest');
const app = require('../../src/app');

describe('Authentication', () => {
  it('should be able to authenticate with valid credentials', async () => {
    const user = await User.create({
      name: 'Vinícius',
      email: 'vinicius_augutis@hotmail.com',
      password_hash: '123456',
    });
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.status).toBe(200);
  });
});
