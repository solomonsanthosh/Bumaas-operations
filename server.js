if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');


const db = require('./database');

const app = express();


app.use(express.json());
const route = require('./routes/route');

app.use('/', route);

app.listen(process.env.PORT, () => console.log('Server is running on port 8090'));
