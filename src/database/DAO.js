'use strict';

// DAO = Data Access Object

const dblib = require('./db.js');
const client = dblib.getClient();
const ObjectId = require('mongodb').ObjectId;

const DAO = {
    findAds: () => {
        const client = dblib.getClient();
        return client.connect().then(() => {
            return client.db().collection("ads").find({}).toArray().then(data => {
                client.close();
                return data;
            });
        });
    },
    findAd: (id) => {
        const client = dblib.getClient();
        return client.connect().then(() => {
            return client.db().collection("ads").findOne({_id: new ObjectId(id)}).then(data => {
                client.close();
                return data;
            });
        });
    },
    createAd: (data) => {
        const client = dblib.getClient();
        return client.connect().then(() => {
            return client.db().collection("ads").insertOne(data).then(data => {
                client.close();
                return data;
            });
        });
    }
};

module.exports = DAO;
