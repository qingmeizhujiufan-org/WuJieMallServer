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
    router.get('/api/product/queryList', controller.product.queryList);

    /* 查询商铺推荐产品列表 */
    router.get('/api/product/queryListByShopId', controller.product.queryListByShopId);

    /* 查询产品详情 */
    router.get('/api/product/queryDetail', controller.product.queryDetail);
    /* 新增产品 */
    router.post('/api/product/add', UserInterceptor, controller.product.add);
    /* 更新产品信息 */
    router.post('/api/product/update', UserInterceptor, controller.product.update);
    /* 删除产品 */
    router.post('/api/product/delete', UserInterceptor, controller.product.delete);
    /* 查询产品全部分类列表 */
    router.get('/api/product/queryAllCategoryList', controller.product.queryAllCategoryList);
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
    router.get('/api/shop/queryDetail', controller.shop.queryDetail);
    /* 新增商铺 */
    router.post('/api/shop/add', UserInterceptor, controller.shop.add);
    /* 更新商铺信息 */
    router.post('/api/shop/update', UserInterceptor, controller.shop.update);
    /* 删除商铺信息 */
    router.post('/api/shop/delete', UserInterceptor, controller.shop.delete);

    /* 附件上传 */
    router.post('/api/attachment/upload', controller.attachment.upload);
    /* 根据id查找附件 */
    router.get('/api/attachment/queryListByIds', controller.attachment.queryListByIds);

    /*
     * APP接口
     */
    /* 移动获取顶部滚动图片 */
    router.get('/api/app/queryTopSliderList', controller.app.queryTopSliderList);
    /* 查询顶部滚动图片详情 */
    router.get('/api/app/queryTopSliderDetail', controller.app.queryTopSliderDetail);
    /* 新增移动端滚动图片 */
    router.post('/api/app/addTopSlider', UserInterceptor, controller.app.addTopSlider);
    /* 修改移动端滚动图片 */
    router.post('/api/app/updateTopSlider', UserInterceptor, controller.app.updateTopSlider);
    /* 删除移动端滚动图片 */
    router.post('/api/app/delTopSlider', UserInterceptor, controller.app.delTopSlider);

    /* 查询特色名宿列表 */
    router.get('/api/hotel/queryList', controller.hotel.queryList);
    /* 查询主题旅游Top3 */
    router.get('/api/hotel/queryListTop3', controller.hotel.queryListTop3);
    /* 移动端查询所有民宿 */
    router.get('/api/hotel/queryMobileList', controller.hotel.queryMobileList);
    /* 查询特色名宿详情 */
    router.get('/api/hotel/queryDetail', controller.hotel.queryDetail);
    /* 新增特色名宿*/
    router.post('/api/hotel/add', controller.hotel.add);
    /* 更新特色名宿 */
    router.post('/api/hotel/update', controller.hotel.update);
    /* 删除特色名宿 */
    router.post('/api/hotel/delete', controller.hotel.delete);


    /* 查询名宿房间列表 */
    router.get('/api/room/queryList', controller.room.queryList);
    /* 管理员查询所有房间列表 */
    router.get('/api/room/queryAdminList', controller.room.queryAdminList);
    /* 移动端查询所有房间 */
    router.get('/api/room/queryMobileList', controller.room.queryMobileList);
    /* 查询名宿房间详情 */
    router.get('/api/room/queryDetail', controller.room.queryDetail);
    /* 新增房间*/
    router.post('/api/room/add', controller.room.add);
    /* 更新名宿房间 */
    router.post('/api/room/update', controller.room.update);
    /* 删除名宿房间 */
    router.post('/api/room/delete', controller.room.delete);
    /* 预订 */
    router.post('/api/room/reserve', controller.room.reserve);
    /* 查询评论 */
    router.get('/api/room/comment', controller.room.queryCommentList);

    /* 查询主题旅游列表 */
    router.get('/api/travel/queryList', controller.travel.queryList);
    /* 查询主题旅游Top3 */
    router.get('/api/travel/queryListTop3', controller.travel.queryListTop3);
    /* 查询旅游详情 */
    router.get('/api/travel/queryDetail', controller.travel.queryDetail);
    /* 新增主题旅游 */
    router.post('/api/travel/add', UserInterceptor, controller.travel.add);
    /* 更新主题旅游信息 */
    router.post('/api/travel/update', UserInterceptor, controller.travel.update);
    /* 更新主题旅游信息 */
    router.post('/api/travel/delete', UserInterceptor, controller.travel.delete);
    /* 报名旅游 */
    router.post('/api/travel/signTravel', controller.travel.signTravel);

    /* 收获地址列表查询*/
    router.get('/api/address/queryList', controller.address.queryList);
    /* 收获地址详情查询*/
    router.get('/api/address/queryDetail', controller.address.queryDetail);
    /*收获地址查询*/
    router.post('/api/address/add', controller.address.add);
    /*收获地址查询*/
    router.post('/api/address/update', controller.address.update);

    // socket.io
    io.of('/').route('exchange', io.controller.nsp.exchange);
};
