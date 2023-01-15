const express = require('express');
const router = express.Router();
const path = require('path');
const url = require('url');
const cors = require('cors')
const { response } = require('express');
const config = require('config')

const testsRouter = require('./routes/tests')

const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')




const port = config.express.port;

const logger = require('./logger/my_logger');
logger.debug('test1');


const app = express();


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));


app.use(express.static(path.join('.', '/static/')));

app.use(express.static(path.join('.', '/script/')))

// ============================================
// == move all REST API to routes/tests.js
// ============================================


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        servers: [
            {
                url: "http://localhost:8080/",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.use('/test', testsRouter);