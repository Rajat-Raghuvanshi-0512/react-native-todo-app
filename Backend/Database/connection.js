const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' })
const DATABASE = process.env.DATABASE;

const ConnectToMongo = () => {
    mongoose.connect(DATABASE, () => {
        console.log(`Connected to MongoDB`);
    })
}

module.exports = ConnectToMongo;