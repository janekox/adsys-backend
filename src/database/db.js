'use strict';

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://root:example@localhost:27017/adsys?authSource=admin&readPreference=primary&ssl=false';
const options = {useUnifiedTopology: true};

const db = {
    getClient: function () {
        return MongoClient(url, options);
    }
};

module.exports = db;
