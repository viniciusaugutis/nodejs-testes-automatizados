const request = require('supertest');
const app = require('../../src/app');

const truncate = require('../utils/truncate');
const factory = require('../utils/factories');
const nodemailer = require('nodemailer');

jest.mock('nodemailer'); //a partir desse momento o modulo nodemailer vai conter o modulo fake que o jest mockou para nós. Posso usar para o jwt, para o bcrypt ou para qualuqer outro modulo

const transport = {
  sendMail: jest.fn(), //mock de uma função vazia que consigo monitorar ela. Função monitorável e tirar muita informação dela
};

describe('Authentication', () => {
  beforeAll(() => {
    nodemailer.createTransport.mockReturnValue(transport); //estou mockando o retorno dessa função pelo que eu passar
  });

  beforeEach(async () => {
    await truncate();
  });

  it('should be able to authenticate with valid credentials', async () => {
    const user = await factory.create('User', { password: '123456' });
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to authenticate with invalid credentials', async () => {
    const user = await factory.create('User', { password: '123456789' });
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', { password: '123456' });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should be able to acess private routes when authenticated', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to acess private routes when not authenticated', async () => {
    const response = await request(app).get('/dashboard');

    expect(response.status).toBe(401);
  });

  it('should not be able to acess private routes when token not valid', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer 123123`);

    expect(response.status).toBe(401);
  });

  it('should receive email notification when authenticated', async () => {
    const user = await factory.create('User', { password: '123456' });
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(transport.sendMail).toHaveBeenCalledTimes(1);
    expect(transport.sendMail.mock.calls[0][0].to).toBe(
      `${user.name} <${user.email}>`
    );
  });
});
