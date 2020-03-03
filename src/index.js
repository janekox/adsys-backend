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
            return DAO.findAds();
        }
    });
    server.route({
        method: 'GET',
        path: '/ad/{id}',
        handler: (request, h) => {
            console.log(`Requested ad with id ${request.params.id}`);
            // TODO implement DAO method
            // return DAO.findAd(request.params.id);
            return {};
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
