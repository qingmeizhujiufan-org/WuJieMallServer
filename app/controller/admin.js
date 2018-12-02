'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
    async queryList() {
        const ctx = this.ctx;
        const adminList = await ctx.service.admin.queryList();
        ctx.body = adminList;
    }

    async add() {
        const ctx = this.ctx;
        const result = await ctx.service.admin.add();
        ctx.body = result;
    }
}

module.exports = AdminController;
