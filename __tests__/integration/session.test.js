const { User } = require('../../src/app/models');
const request = require('supertest');
const app = require('../../src/app');

const truncate = require('../utils/truncate');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to authenticate with valid credentials', async () => {
    const user = await User.create({
      name: 'Vinícius',
      email: 'vinicius_augutis@hotmail.com',
      password: '123456',
    });
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to authenticate with invalid credentials', async () => {
    const user = await User.create({
      name: 'Vinícius',
      email: 'vinicius_augutis@hotmail.com',
      password: '123456',
    });
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456789',
      });

    expect(response.status).toBe(401);
  });
});
