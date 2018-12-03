'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/api', controller.home.index);
   
    /* 后台管理登录 */
    router.post('/api/admin/login', controller.admin.login);
     /* 获取 */
    router.get('/api/admin/queryList', controller.admin.queryList);
    /* 后台新增管理人员 */
    router.post('/api/admin/add', controller.admin.add);

    /* 角色列表 */
    router.get('/api/role/queryList', controller.role.queryList);

};
