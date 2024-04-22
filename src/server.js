const express = require('express');
const app = express();
const apiRoutes = require('../src/routers/apiRoutes');
const bodyParser = require('body-parser');
const docs = require('./docs/docs');

//setting up documentation
app.use('/dev/docs', docs);

//adding some middlewares
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/questionnaire', apiRoutes);

app.listen(3001, ()=>{
    console.log(`Server connected to port 3001`);
})