const express = require('express');
const routers = express.Router();
const apiController = require('../controllers/apiController');
const upload = require('../middlewares/fileUpload');

// routers.post('/sendTopic', sendTopic);
routers.get('/getQuestions', apiController.getQuestions);
routers.post('/sendAnswers', upload.single('file'), apiController.sendAnswer);

module.exports = routers;