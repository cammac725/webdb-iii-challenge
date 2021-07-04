const express = require('express');
const configMiddleware = require('./config/middleware');

const cohortsRouter = require('./cohorts/cohorts-router');
const studentsRouter = require('./students/students-router');

const server = express();

configMiddleware(server);

server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

module.exports = server;