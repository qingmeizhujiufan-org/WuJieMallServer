'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {

  async login() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    const user = await ctx.service.admin.login(params);
    if (user) {
      ctx.body = {
        success: true,
        backData: user
      };
    } else {
      ctx.body = {
        success: false,
        backMsg: "用户编码或密码不正确！"
      };
    }
  }

  async queryList() {
    const ctx = this.ctx;
    const adminList = await ctx.service.admin.queryList();
    ctx.body = adminList;
  }

  async add() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    console.log('params ===', params);
    const result = await ctx.service.admin.add(params);
    console.log('result ===', result);

    if (result.affectedRows === 1) {
      ctx.body = {
        success: true,
        backData: result
      };
    } else {
      ctx.body = {
        success: false,
        backMsg: "新增用户失败！"
      };
    }
  }
}

module.exports = AdminController;