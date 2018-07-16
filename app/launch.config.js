'use strict';

const path = require('path');

const address = 'YOUR_HOT_WALLET_RIPPLE_ADDRESS';
const secret = 'YOUR_HOT_WALLET_RIPPLE_SECRET';

const peerPlugin = {
    relation: 'peer',
    plugin: 'ilp-plugin-xrp-paychan',
    assetCode: 'XRP',
    assetScale: 9,
    balance: {
        maximum: '10000000',
        settleThreshold: '-5000000',
        settleTo: '0'
    },
    options: {
        assetScale: 9,
        listener: {
            port: 8080,
            secret: 'RANDOM_SECRET'
        },
        rippledServer: 'wss://s1.ripple.com',
        secret,
        address,
        peerAddress: 'RIPPLE_ADDRESS_OF_PEER'
    }
};

const miniAccounts = {
    relation: 'child',
    plugin: 'ilp-plugin-mini-accounts',
    assetCode: 'XRP',
    assetScale: 9,
    options: {
        port: 7768
    }
};

const connectorApp = {
    name: 'connector',
    env: {
        DEBUG: 'ilp*,connector*',
        CONNECTOR_ILP_ADDRESS: 'MY_ILP_ADDRESS',
        CONNECTOR_ENV: 'production',
        CONNECTOR_BACKEND: 'one-to-one',
        CONNECTOR_ADMIN_API: true,
        CONNECTOR_ADMIN_API_PORT: 7769,
        CONNECTOR_SPREAD: '0',
        CONNECTOR_STORE_PATH: '/srv/app/connector-data',
        CONNECTOR_ACCOUNTS: JSON.stringify({
            peer: peerPlugin,
            local: miniAccounts
        })
    },
    script: path.resolve(__dirname, 'src/index.js')
};

module.exports = { apps: [ connectorApp ] };
