'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/api', controller.home.index);

    /* 后台管理登录 */
    router.post('/api/admin/login', controller.admin.login);
    /* 获取用户列表 */
    router.get('/api/admin/queryList', controller.admin.queryList);
    /* 获取用户详情 */
    router.get('/api/admin/qureyOneUser', controller.admin.qureyOneUser);
    /* 后台新增管理人员 */
    router.post('/api/admin/add', controller.admin.add);
    /* 后台修改管理人员 */
    router.post('/api/admin/updateUser', controller.admin.updateUser);
    /* 后台删除用户 */
    router.post('/api/admin/delete', controller.admin.delete);
    /* 后台用户冻结 */
    router.post('/api/admin/frozen', controller.admin.frozen);
    /* 后台重置密码 */
    router.post('/api/admin/resetPassword', controller.admin.resetPassword);

    /* 角色列表 */
    router.get('/api/role/queryList', controller.role.queryList);

    /* 查询产品列表 */
    router.get('/api/product/queryList', controller.product.queryList);
    /* 查询产品详情 */
    router.get('/api/product/queryDetail', controller.product.queryDetail);
    /* 新增产品 */
    router.post('/api/product/add', controller.product.add);
    /* 更新产品信息 */
    router.post('/api/product/update', controller.product.update);

    /* 获取获取 */
    router.get('/api/attachment/upload', controller.attachment.upload);
    /* 附件上传 */
    router.post('/api/attachment/upload', controller.attachment.upload);
    /* 根据id查找附件 */
    router.get('/api/attachment/queryListByIds', controller.attachment.queryListByIds);
};