const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.port || 8080;

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'NodeJS Mock API',
            version: '1.0.0',
        },
    },
    apis: ['index.js'], // files containing annotations as above
};
const swaggerSpecification = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecification));


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
    var mockData = {
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

    res.status(200).header('Content-Type','application/json').send(mockData);
    res.end();
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});