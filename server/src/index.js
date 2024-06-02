const express = require('express');
const cors = require('cors');
const connectDB = require('./database/database');
const router = require('./routes/routes');
require('dotenv').config();

const userDatabase = require('./database/user.database') 

const app = express();

// connect the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

const PORT = process.env.SERVER_PORT;

app.use(cors());

// // Define a root route
// app.get('/', (req, res) => {
//     res.send('Welcome to the API');
// });

app.use('/', router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

async function initApplication(){
    console.log('Hello World!');
    // const a = await userDatabase.create({name: 'john', email: 'john4@mail.com', password: '1234'});

    // console.log(a);
}

initApplication();
