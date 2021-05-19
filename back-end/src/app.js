const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');

require('dotenv').config({
    path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
});

class AppController {
    constructor() {
        this.express = express();
    
        this.bodyParser();
        this.middlewares();
        this.cors();
        this.routes();
    }

    bodyParser() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    middlewares() {
        this.express.use(express.json());
    }    

    cors() {
        this.express.use(cors('*'));
    }

    routes() {
        this.express.use(require("./routes"));
    }
}

module.exports = new AppController().express;