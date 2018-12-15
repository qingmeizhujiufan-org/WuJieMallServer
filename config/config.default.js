'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1543235988607_825';

    // add your config here
    config.middleware = [];

    config.mysql = {
        // 单数据库信息配置
        client: {
            // host
            host: '39.104.166.165',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: 'root',
            // 数据库名
            database: 'wujiemalldb',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    };

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

    config.sequelize = {
        dialect: 'mysql',
        host: '39.104.166.165',
        port: 3306,
        database: 'wujiemalldb',
        username: 'root',
        password: 'root',
    };

    return config;
};