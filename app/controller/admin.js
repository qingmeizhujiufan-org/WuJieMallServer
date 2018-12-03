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
    ctx.body = {
      success: true,
      backMsg: "获取用户列表成功！",
      backData: adminList
    };
  }

  async add() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    // console.log('params ===', params);
    const uniqueUser = await ctx.service.admin.findByName({ user_name: params.userName })

    if (uniqueUser !== null) {
      const result = await ctx.service.admin.add(params);
      if (result.affectedRows === 1) {
        ctx.body = {
          success: true,
          backMsg: "新增用户成功！",
          backData: result
        };
      } else {
        ctx.body = {
          success: false,
          backMsg: "新增用户失败！"
        };
      }
    } else {
      ctx.body = {
        success: false,
        backMsg: "用户名已存在!"
      };
    }
  }
}

module.exports = AdminController;