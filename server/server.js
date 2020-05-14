// SERVER FILE
// ============================================================
require('dotenv').config();

const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const readline = require('readline')

const info = require('../package.json');
const logger = require('./utilities/logger');
const routes = require('./routes');

const app = express()
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
// ============================================================
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())

// ROUTES FOR OUR API
// ============================================================
app.use('/', routes)

// NO ROUTE HANDLER
// ============================================================
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// GLOBAL ERROR HANDLER
// ============================================================
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const status = err.status || 500;
    return res.status(status).json({
        app: `${info.name} @ ${info.version}`,
        status,
        error: err.message,
        stack: err.stack,
    });
});

// START SERVER
// ============================================================
const server = app.listen(PORT, () => {
    logger.log(`Server is running on http://localhost:${PORT}`);
});

// GRACEFUL SHUTDOWN
// ============================================================
if (process.platform === 'win32') {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

const exit = () => {
    // shut down services, like Cache / Database / etc
    logger.log('Closing server...');
    server.close(() => {
        logger.log('Server was closed!');
        process.exit(0);
    });
};

// graceful shutdown on windows
process.on('SIGINT', () => exit());

// graceful shutdown on unix
process.on('SIGTERM', () => exit());
