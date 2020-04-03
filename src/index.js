'use strict';

const Hapi = require('@hapi/hapi');
const DAO = require('./database/DAO');
const crypto = require('crypto');

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
            return DAO.findAds(request.query.title);
        }
    });
    server.route({
        method: 'GET',
        path: '/ad/{id}',
        handler: (request, h) => {
            console.log(`Requested ad with id ${request.params.id}`);
            return DAO.getAd(request.params.id);
        }
    });
    server.route({
        method: 'GET',
        path: '/hash/{hash}',
        handler: (request, h) => {
            console.log(`Requested ad with hash ${request.params.hash}`);
            return DAO.getAdByHash(request.params.hash);
        }
    });
    server.route({
        method: 'GET',
        path: '/remove/{hash}',
        handler: (request, h) => {
            console.log(`Requested ad with hash ${request.params.hash}`);
            return DAO.removeAd(request.params.hash);
        }
    });
    server.route({
        method: 'POST',
        path: '/ad',
        handler: (request, h) => {
            console.log('Creating new ad');
            const ts = (new Date()).getTime().toString();
            const hash = crypto.createHash('md5').update(ts).digest("hex");

            const data = JSON.parse(request.payload);
            data.hash = hash;

            return DAO.createAd(data).then(() => {
                return {hash: hash};
            })
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
