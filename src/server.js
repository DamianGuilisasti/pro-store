const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// MongoDB
mongoose.connect('mongodb://localhost/mevn-stack');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewres
app.use(bodyParser.json()); //Para que Nodejs entienda lo que Vuejs envía.

// Routes

// Statis files


// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});