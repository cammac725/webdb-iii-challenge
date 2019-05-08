const express = require('express');
const configMiddleware = require('./config/middleware')

const cohortsRouter = require('./cohorts/cohorts-router')

const server = express();

configMiddleware(server)

server.use('/api/cohorts', cohortsRouter)

module.exports = server;