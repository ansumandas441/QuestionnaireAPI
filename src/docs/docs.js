const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./documentation.json'); // Assuming you have a swagger.json file
const express = require('express');
const router = express.Router();

// Serve Swagger UI at /api-docs route
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;