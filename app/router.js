'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/api', controller.home.index);
    /* 获取 */
    router.get('/api/admin/queryList', controller.admin.queryList);
    /* 后台新增管理人员 */
    router.get('/api/add', controller.home.add);
    /* 后台管理登录 */
    router.post('/api/login', controller.home.login);
};
