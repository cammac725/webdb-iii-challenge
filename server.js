const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const cohortsRouter = require('./cohorts/cohorts-router')

const server = express();

server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

server.use('/api/cohorts', cohortsRouter)

module.exports = server;