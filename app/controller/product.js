'use strict';

const BaseController = require('../core/BaseController');

class HomeController extends BaseController {
  async queryList() {
    const ctx = this.ctx;
    const params = ctx.query;
    params.pageNumber = parseInt(params.pageNumber);
    params.pageSize = parseInt(params.pageSize);
    const result = await ctx.service.product.queryList(params);
    if (result) {
      this.success({
        backData: {
          ...result,
          pageSize: params.pageSize,
          pageNumber: params.pageNumber
        },
        backMsg: "查询列表成功！"
      })
    } else {
      this.fail({ backMsg: "查询失败！" });
    }
  }

  async queryDetail() {
    const ctx = this.ctx;
    const params = ctx.query;
    const result = await ctx.service.product.queryDetail(params);

    if (result) {
      const headerPicList = await ctx.service.attachment.queryListByIds(result.headerPic);
      const detailPicList = await ctx.service.attachment.queryListByIds(result.detailPic);
      result.headerPic = headerPicList;
      result.detailPic = detailPicList;

      this.success({
        backData: result,
        backMsg: '查询成功！'
      });
    } else {
      this.fail({ backMsg: "查询失败！" });
    }
  }

  async add() {
    const ctx = this.ctx;
    const fieldsValue = ctx.request.body;
    const result = await ctx.service.product.add(fieldsValue);

    if (result.rowsAffected) {
      this.success({
        backData: result,
        backMsg: "新增产品成功！"
      });
    } else {
      this.fail({
        backMsg: "新增失败！"
      });
    }
  }

  async update() {
    const ctx = this.ctx;
    const fieldsValue = ctx.request.body;
    const result = await ctx.service.product.update(fieldsValue);

    if (result.rowsAffected) {
      this.success({
        backData: result,
        backMsg: "修改产品信息成功！"
      });
    } else {
      this.fail({
        backMsg: "修改产品信息失败！"
      });
    }
  }

  //查询所有产品
  async queryAllCategoryList() {
    const ctx = this.ctx;
    const result = await ctx.service.product.queryAllCategoryList();
    if(result) {
    this.success({
        backData: result,
        backMsg: "查询列表成功！"
      })
    } else {
      this.fail({ backMsg: "查询失败！" });
    }
  }

  //产品分类列表
  async queryCategoryList() {
    const ctx = this.ctx;
    const params = ctx.query;
    params.pageNumber = parseInt(params.pageNumber);
    params.pageSize = parseInt(params.pageSize);
    const result = await ctx.service.product.queryCategoryList(params);
    if (result) {
      for (let item of result.content) {
        const pic = await ctx.service.attachment.queryListByIds(item.productCategoryPic);
        item.productCategoryPic = pic;
      }

      this.success({
        backData: {
          ...result,
          pageSize: params.pageSize,
          pageNumber: params.pageNumber
        },
        backMsg: "查询列表成功！"
      })
    } else {
      this.fail({ backMsg: "查询失败！" });
    }
  }

  //产品分类新增
  async categoryAdd() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    const result = await ctx.service.product.categoryAdd(params);
    if (result[1]) {
      this.success({
        backData: result,
        backMsg: "新增产品类别成功！"
      });
    } else {
      this.fail({
        backMsg: "新增产品类别失败,当前分类已存在！"
      });
    }
  }

  //产品分类详情
  async categoryDetail() {
    const ctx = this.ctx;
    const params = ctx.query;

  }

  //产品分类更新
  async categoryUpdate() {
    const ctx = this.ctx;
    const params = ctx.query;

  }

  //产品分类删除
  async categoryDelete() {
    const ctx = this.ctx;
    const params = ctx.query;

  }
}

module.exports = HomeController;