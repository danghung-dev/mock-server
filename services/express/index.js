const express = require('express')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require('../../config/config')
const log = require('../logger');
const { ApiError } = require('../error');

module.exports = (apiRoot, routes) => {
    const app = express()

    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))

    app.use(bodyParser.urlencoded({ extended: false })) 
    app.use(bodyParser.json({
        limit : config.bodyLimit
    }))
    app.use(apiRoot, routes)

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
        log.error("Internal error " + err.stack);

        if (req.app.get('env') !== 'development') {
            delete err.stack;
        }   

        if (err instanceof ApiError) {
            return res.status(err.statusCode || 500).json({
                statusCode: err.statusCode,
                errors: err.errors,
                stack: err.stack
            }); 
        }

        // render the error page
        let statusCode = err.status || 500;
        return res.status(statusCode).json({
            statusCode: statusCode,
            errors: err.message,
            stack: err.stack
        }); 
    });

    return app 
}
