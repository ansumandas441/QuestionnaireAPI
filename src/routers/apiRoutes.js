const express = require('express');
const routers = express.Router();
const apiController = require('../controllers/apiController');

// routers.post('/sendTopic', sendTopic);
routers.get('/getQuestions', apiController.getQuestions);
// routers.post('/sendAnswers', sendAnswer);

module.exports = routers;