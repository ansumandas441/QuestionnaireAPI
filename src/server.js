const express = require('express');
const app = express();
const apiRoutes = require('../src/routers/apiRoutes');

app.use('/api/questionnaire', apiRoutes);

app.listen(3001, ()=>{
    console.log(`Server connected to port 3001`);
})