'use strict';

// DAO = Data Access Object

const dblib = require('./db.js');
const ObjectId = require('mongodb').ObjectId;

const DAO = {
    findAds: (userInput) => {
        const client = dblib.getClient();
        return client.connect().then(() => {
            const query = {};
            if (userInput) {
                query.title = new RegExp(`${userInput}`, 'i');
            }
            return client.db().collection("ads").find(query, {projection: {hash: 0}}).toArray().then(data => {
                client.close();
                return data;
            });
        });
    },
    getAd: (id) => {
        const client = dblib.getClient();
        return client.connect().then(() => {
            return client.db().collection("ads").findOne({_id: new ObjectId(id)}).then(data => {
                client.close();
                delete data.hash;
                return data;
            });
        });
    },
    getAdByHash: (hash) => {
        const client = dblib.getClient();
        return client.connect().then(() => {
            return client.db().collection("ads").findOne({hash: hash}).then(data => {
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
    },
    removeAd: (hash) => {
        const client = dblib.getClient();
        return client.connect().then(() => {
            return client.db().collection("ads").remove({hash: hash}).then(data => {
                client.close();
                return data;
            });
        });
    }
};

module.exports = DAO;
