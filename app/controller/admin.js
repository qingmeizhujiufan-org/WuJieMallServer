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

  async qureyOneUser() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    const result = await ctx.service.admin.qureyOneUser(params);
    if (result) {
      ctx.body = {
        success: true,
        backMsg: "用户详情查询成功！",
        backData: result
      };
    } else {
      ctx.body = {
        success: true,
        backMsg: "用户详情查询成功！",
        backData: result
      };
    }
  }

  async add() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    // console.log('params ===', params);

    const uniqueUser = await ctx.service.admin.findByName({ user_name: params.user_name })

    if (uniqueUser === null) {
      const result = await ctx.service.admin.add(data);
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

  async updateUser() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    const result = await ctx.service.admin.updateUser(params);
    if (result.affectedRows === 1) {
      ctx.body = {
        success: true,
        backMsg: "人员信息修改成功",
        backData: result
      };
    } else {
      ctx.body = {
        success: false,
        backMsg: "人员信息修改失败！"
      };
    }
  }

  async delete() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    const result = await ctx.service.admin.delete(params);
    console.log('result ===', result)
    if (result.affectedRows === 1) {
      ctx.body = {
        success: true,
        backMsg: "用户删除成功",
        backData: result
      };
    } else {
      ctx.body = {
        success: false,
        backMsg: "用户删除失败！"
      };
    }
  }

  async frozen() {
    const ctx = this.ctx;
    const params = ctx.request.body;
    const isFrozen = params.is_frozen;
    const result = await ctx.service.admin.frozen(params);
    if (result.affectedRows === 1) {
      ctx.body = {
        success: true,
        backMsg: isFrozen ? "用户冻结成功！" : "用户解冻成功！",
        backData: result
      };
    } else {
      ctx.body = {
        success: false,
        backMsg: isFrozen ? "用户冻结成失败！" : "用户解冻失败！"
      };
    }
  }

  async resetPassword() {
    const ctx = this.ctx;
    const params = ctx.request.body;

    const result = await ctx.service.admin.resetPassword(params)
    if (result.affectedRows === 1) {
      ctx.body = {
        success: true,
        backMsg: "重置密码成功，新密码为000000",
        backData: result
      };
    } else {
      ctx.body = {
        success: false,
        backMsg: "重置密码失败！"
      };
    }
  }
}

module.exports = AdminController;