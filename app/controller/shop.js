'use strict';

const BaseController = require('../core/BaseController');

class ShopController extends BaseController {
  async queryList() {
    const ctx = this.ctx;
    const params = ctx.query;
    params.pageNumber = parseInt(params.pageNumber);
    params.pageSize = parseInt(params.pageSize);
    const result = await ctx.service.shop.queryList(params);
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
    const result = await ctx.service.shop.queryDetail(params);

    if (result) {
      const shopPic = await ctx.service.attachment.queryListByIds(result.shopPic);
      result.shopPic = shopPic;

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
    const result = await ctx.service.shop.add(fieldsValue);

    if (result.rowsAffected) {
      this.success({
        backData: result,
        backMsg: "新增店铺成功！"
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
    const result = await ctx.service.Shop.update(fieldsValue);

    if (result.rowsAffected) {
      this.success({
        backData: result,
        backMsg: "修改店铺信息成功！"
      });
    } else {
      this.fail({
        backMsg: "修改店铺信息失败！"
      });
    }
  }
}

module.exports = ShopController;