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
    },
    // TODO implement findAd(id) function - similar to findsDAO
    // use findOne with appropriate query object
    // it may looks like: { paramName: paramValue }
    // https://mongodb.github.io/node-mongodb-native/3.5/api/Collection.html#findOne
};

module.exports = DAO;
