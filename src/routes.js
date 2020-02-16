const routes = require('express').Router();

routes.get('/', (req, res) => res.send('Hello Word'));

module.exports = routes;