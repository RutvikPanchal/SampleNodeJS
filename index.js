const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.port || 8088;

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'NodeJS Mock API',
            version: '1.0.6',
        },
    },
    apis: ['index.js'], // files containing annotations as above
};
const swaggerSpecification = swaggerJsdoc(swaggerOptions);

app.use(cors());

app.use(express.raw({inflate: true, limit: '1mb', type: () => true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecification));

const mockData = {
    "key": "Value",
    "keyValue": "Pair",
    "array": [
        {
            "key": "Value"
        },
        10,
        20
    ],
    "object": {
        "key": "Value",
        "bool": true
    }
};


/**
 * @swagger
 * /getMockData:
 *     get:
 *         tags:
 *          - API
 *         description: Get Mock Data
 *         responses:
 *             200:
 *                 Description: Success
 * 
 */
app.get('/getMockData', async (req, res) => {
    console.log(`GET Request at getMockData arrived at ${new Date().toISOString()}`);

    res.status(200).header('Content-Type','application/json').send(mockData);
    res.end();
});

/**
 * @swagger
 * /getTime:
 *     get:
 *         description: Get Current Time
 *         tags:
 *          - API
 *         responses:
 *             200:
 *                 Description: Success
 * 
 */
 app.get('/getTime', async (req, res) => {
    var mockData = {
        "time": new Date().toUTCString()
    };

    console.log(`GET Request at getTime arrived at ${new Date().toISOString()}`);

    res.status(200).header('Content-Type','application/json').send(mockData);
    res.end();
});

/**
 * @swagger
 * /getDataSlowly:
 *     get:
 *         tags:
 *          - API
 *         description: Get Data Slowly (5 seconds)
 *         responses:
 *             200:
 *                 Description: Success
 * 
 */
 app.get('/getDataSlowly', async (req, res) => {
    console.log(`GET Request at getDataSlowly arrived at ${new Date().toISOString()}`);

    setTimeout(() => {
        res.status(200).header('Content-Type','application/json').send(mockData);
        res.end();
    }, 5000);
});

/**
 * @swagger
 * /get500:
 *     get:
 *         tags:
 *          - API
 *         description: Get 500 Error
 *         responses:
 *             500:
 *                 Description: Internal Server Error
 * 
 */
 app.get('/get500', async (req, res) => {
    console.log(`GET Request at get500 arrived at ${new Date().toISOString()}`);

    res.status(500).header('Content-Type','application/json').send();
    res.end();
});

/**
 * @swagger
 * /postData:
 *     post:
 *         description: Post Mock Data
 *         tags:
 *          - API
 *         responses:
 *             200:
 *                 Description: Success
 * 
 */
 app.post('/postData', async (req, res) => {
    console.log(`POST Request at postData arrived at ${new Date().toISOString()}`);

    console.log(req.headers, '\n', req.body);
    res.status(200).header('Content-Type','application/json').send(mockData);
    res.end();
});

/**
 * @swagger
 * /debug/postData:
 *     post:
 *         description: Post Mock Data
 *         tags:
 *          - API - Debug
 *         responses:
 *             200:
 *                 Description: Success
 * 
 */
 app.post('/debug/postData', async (req, res) => {
    console.log(`\nPOST Request at debug/postData arrived at ${new Date().toISOString()}`);
    console.log(`Requst URL: ${req.hostname + req.originalUrl}\nRequest Headers: ${(JSON.stringify(req.headers, null, 2))}\nRequest Body: ${(req.body)}`);

    res.status(200).header('Content-Type','application/json').send(mockData);
    res.end();
});

app.listen(PORT, () => {
    console.log(`\nListening on port ${PORT}`);
    console.log(`Swagger UI: http://localhost:${PORT}/docs`);
});
