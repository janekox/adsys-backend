'use strict';

// DAO = Data Access Object

const dblib = require('./db.js');
const client = dblib.getClient();

const DAO = {
    findAds: () => {
        const client = dblib.getClient();
        return client.connect().then(() => {
            return client.db().collection("ads").find({}).toArray().then(data => {
                client.close();
                return data;
            });
        });
    }
};

module.exports = DAO;
