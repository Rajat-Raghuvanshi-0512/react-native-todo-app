const ConnectToMongo = require('./Database/connection');
const express = require('express');
const dotenv = require('dotenv');

const app = express();
var cors = require('cors')

app.use(cors())

dotenv.config({ path: './config.env' })
const PORT = process.env.PORT;

//Connecting to MongoDB
ConnectToMongo();


app.use(express.json())
app.use('/auth', require('./Routes/auth'))
app.use('/notes', require('./Routes/notes'))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`App started at Port ${PORT}`);
})