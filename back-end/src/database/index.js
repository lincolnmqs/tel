require('dotenv').config({
    path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
});

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log(`Connected to Database: ${db.name}`));

module.exports = mongoose;

