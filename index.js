'use strict';

const Hapi = require('@hapi/hapi');

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
            return require('./data/ads.json');
        }
    });
    server.route({
        method: 'GET',
        path: '/ad/{id}',
        handler: (request, h) => {
            const requestedId = request.params.id;
            const ads = require('./data/ads.json');
            const foundAd = ads.data.find(ad => ad._id === requestedId);
            return foundAd;
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
