'use strict';

const Service = require('egg').Service;

class ShopService extends Service {

  async queryList(params) {
    const ctx = this.ctx;
    const Shop = ctx.model.Shop;

    const { pageNumber, pageSize } = params;
    const total = await Shop.findAll({
      where: {}
    });
    const res = await Shop.findAll({
      where: {},
      order: [
        ['created_at', 'DESC']
      ], // 排序方式
      limit: pageSize, // 返回数据量
      offset: (pageNumber - 1) * pageSize, // 数据偏移量
    });

    // for (let item of res) {
    //   item.productCategoryName = item.ProductCategory.productCategoryName
    // }
    // console.log('res ===', res)

    return {
      content: res,
      totalElements: total.length
    };
  }

  async queryDetail(params) {
    const ctx = this.ctx;
    const { id } = params;
    const res = await ctx.model.Shop.findById(id);

    return res;
  }

  async add(fieldsValue) {
    const ctx = this.ctx;
    const row = {
      // id: UUID.v1(),
      ...fieldsValue
    };
    const res = await ctx.model.Shop.create(row);

    return {
      rowsAffected: res,
    };
  }

  async update(fieldsValue) {
    const ctx = this.ctx;
    const { id, ...restFieldsValue } = fieldsValue;
    const res = await ctx.model.Shop.update(restFieldsValue, {
      where: { id }
    });

    return { rowsAffected: res };
  }
}

module.exports = ShopService;