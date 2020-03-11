'use strict';

const path = require('path');
const {Seeder} = require('mongo-seeding');

const config = {
    database: {
        name: 'adsys',
        username: 'root',
        password: 'example',
        options: {
            authSource: 'admin'
        }
    },
    dropDatabase: true,
};

const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve('./data'));

seeder.import(collections)
    .then(() => {
        console.log('Successfully finished seeding database');
    })
    .catch(err => {
        console.log('Error', err);
    });
