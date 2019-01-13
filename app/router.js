'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller, io} = app;
    const UserInterceptor = app.middleware.userInterceptor({}, app);
    router.get('/api', controller.home.index);

    /* 后台管理登录 */
    router.post('/api/admin/login', controller.admin.login);
    /* 获取用户列表 */
    router.get('/api/admin/queryList', UserInterceptor, controller.admin.queryList);
    /* 获取用户详情 */
    router.get('/api/admin/qureyOneUser', UserInterceptor, controller.admin.qureyOneUser);
    /* 后台新增管理人员 */
    router.post('/api/admin/add', UserInterceptor, controller.admin.add);
    /* 后台修改管理人员 */
    router.post('/api/admin/updateUser', UserInterceptor, controller.admin.updateUser);
    /* 后台删除用户 */
    router.post('/api/admin/delete', UserInterceptor, controller.admin.delete);
    /* 后台用户冻结 */
    router.post('/api/admin/frozen', UserInterceptor, controller.admin.frozen);
    /* 后台重置密码 */
    router.post('/api/admin/resetPassword', UserInterceptor, controller.admin.resetPassword);

    /* 角色列表 */
    router.get('/api/role/queryList', UserInterceptor, controller.role.queryList);

    /* 查询产品列表 */
    router.get('/api/product/queryList', UserInterceptor, UserInterceptor, controller.product.queryList);
    /* 查询产品详情 */
    router.get('/api/product/queryDetail', UserInterceptor, controller.product.queryDetail);
    /* 新增产品 */
    router.post('/api/product/add', UserInterceptor, controller.product.add);
    /* 更新产品信息 */
    router.post('/api/product/update', UserInterceptor, controller.product.update);
    /* 新增产品 */
    router.post('/api/product/delete', UserInterceptor, controller.product.delete);
    /* 查询产品全部分类列表 */
    router.get('/api/product/queryAllCategoryList', UserInterceptor, controller.product.queryAllCategoryList);
    /* 查询产品分类列表 */
    router.get('/api/product/queryCategoryList', UserInterceptor, controller.product.queryCategoryList);
    /* 新增产品分类 */
    router.post('/api/product/categoryAdd', UserInterceptor, controller.product.categoryAdd);
    /* 查看产品分类信息 */
    router.get('/api/product/categoryDetail', UserInterceptor, controller.product.categoryDetail);
    /* 更新产品分类信息 */
    router.post('/api/product/categoryUpdate', UserInterceptor, controller.product.categoryUpdate);
    /* 删除产品分类信息 */
    router.post('/api/product/categoryDelete', UserInterceptor, controller.product.categoryDelete);

    /* 查询商铺列表 */
    router.get('/api/shop/queryList', UserInterceptor, controller.shop.queryList);
    /* 查询商铺详情 */
    router.get('/api/shop/queryDetail', UserInterceptor, controller.shop.queryDetail);
    /* 新增商铺 */
    router.post('/api/shop/add', UserInterceptor, controller.shop.add);
    /* 更新商铺信息 */
    router.post('/api/shop/update', UserInterceptor, controller.shop.update);
    /* 删除商铺信息 */
    router.post('/api/shop/delete', UserInterceptor, controller.shop.delete);

    /* 获取获取 */
    router.get('/api/attachment/upload', UserInterceptor, controller.attachment.upload);
    /* 附件上传 */
    router.post('/api/attachment/upload', UserInterceptor, controller.attachment.upload);
    /* 根据id查找附件 */
    router.get('/api/attachment/queryListByIds', UserInterceptor, controller.attachment.queryListByIds);

    /*
    * APP接口
    */
    /* 移动获取顶部滚动图片 */
    router.get('/api/app/queryTopSliderList', controller.app.queryTopSliderList);
    /* 新增移动端滚动图片 */
    router.post('/api/app/addTopSlider', UserInterceptor, controller.app.addTopSlider);

    // socket.io
    io.of('/').route('exchange', io.controller.nsp.exchange);
};
