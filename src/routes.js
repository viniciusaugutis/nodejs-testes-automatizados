const routes = require('express').Router();
const { User } = require('./app/models');

routes.get('/', (req, res) => {
  const user = User.create({
    name: 'Vinicius',
    email: 'vinicius_augutis@hotmail.com',
    password_hash: '123456',
  });
  return res.json({ user });
});

module.exports = routes;
