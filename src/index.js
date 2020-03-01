'use strict';

const Hapi = require('@hapi/hapi');
const DAO = require('./database/DAO');

const init = async () => {

    const server = Hapi.server({
        port: 4000,
        host: '0.0.0.0',
        routes: {cors: {origin: ['*']}}
    });

    server.route({
        method: 'GET',
        path: '/health',
        handler: (request, h) => {
            return {status: "I'm ok"};
        }
    });
    server.route({
        method: 'GET',
        path: '/ads',
        handler: (request, h) => {
            console.log('Requested ads');
            return require('../data/ads.json');
        }
    });
    server.route({
        method: 'GET',
        path: '/ad/{id}',
        handler: (request, h) => {
            console.log(`Requested ad with id ${request.params.id}`);
            const requestedId = request.params.id;
            const ads = require('../data/ads.json');
            const foundAd = ads.data.find(ad => ad._id === requestedId);
            return foundAd;
        }
    });
    server.route({
        method: 'GET',
        path: '/test',
        handler: (request, h) => {
            return DAO.findAds();
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
