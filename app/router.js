'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/api', controller.home.index);
    router.get('/api/getUserList', controller.home.getUserList);
    router.get('/api/add', controller.home.add);
    router.post('/api/login', controller.home.login);
};
