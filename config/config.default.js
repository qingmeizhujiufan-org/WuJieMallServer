'use strict';

const sequelizeConfig = require('./config.sequelize');

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1543235988607_825';

    // add your config here
    config.middleware = [];

    /* 关闭csrf */
    config.security = {
        csrf: {
            enable: false
        },
        domainWhiteList: ['*']
    };

    config.cors = {
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH, OPTIONS'
    };

    config.multipart = {
        mode: 'stream',
    };

    config.sequelize = sequelizeConfig;

    return config;
};
