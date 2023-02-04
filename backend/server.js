const conn = require('./config/dbConn')
const express = require('express')
const env = require('dotenv').config()
const {errorHandler} = require('./middleware/error')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/category/',require('./routes/category'))
app.use('/api/user/',require('./routes/user'))
app.use(errorHandler);

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
    console.log("I am running..........",PORT);
});