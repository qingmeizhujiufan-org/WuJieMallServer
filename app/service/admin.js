'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');

class AdminService extends Service {

  async login(params) {
    // 假如 我们拿到用户名以及密码从数据库获取用户详细信息
    const user = await this.model.Admin.findOne({ where: params });
    return user;
  }

  async queryList(params) {
    const ctx = this.ctx;
    const { pageNumber, pageSize } = params;

    const total = await ctx.model.Admin.findAll({
      where: {}
    })
    const res = await ctx.model.Admin.findAll({
      where: {},
      orders: [
        ['create_time', 'desc']
      ], // 排序方式
      limit: pageSize, // 返回数据量
      offset: (pageNumber - 1) * pageSize, // 数据偏移量
    });

    return {
      content: res,
      totalElements: total.length
    };
  }

  async add(params) {
    const data = {
      ...params,
      isFrozen: 0
    };
    const res = await this.ctx.model.Admin.create(data);
    return res;
  }

  async updateUser(params) {
    // params.create_time = new Date(params.create_time);
    const res = await this.ctx.model.Admin.update(params, {
      where: { id: params.id }
    });
    return res;
  }

  async qureyOneUser(params) {
    const res = await this.ctx.model.Admin.findOne({
      where: { id: params.id }
    });
    return res;
  }

  async delete(params) {
    const res = await this.ctx.model.Admin.destroy({
      where: { id: params.id }
    });
    return res;
  }

  async findByName(params) {
    const user = await this.ctx.model.Admin.findOne({
      where: params
    });
    return user;
  }

  async resetPassword(params) {
    const newData = {
      ...params,
      password: '000000',
    }
    const res = await this.ctx.model.Admin.update(newData, {
      where: { id: params.id }
    });
    return res;
  }

  async frozen(params) {
    const newData = {
      ...params
    }
    const res = await this.ctx.model.Admin.update(newData, {
      where: { id: params.id }
    });
    return res;
  }
}

module.exports = AdminService;