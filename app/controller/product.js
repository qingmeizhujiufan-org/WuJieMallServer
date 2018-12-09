'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async queryList() {
        const ctx = this.ctx;
        const result = await ctx.service.product.queryList();
        if (result) {
            ctx.body = {
                success: true,
                backData: result,
                backMsg: "查询列表成功！"
            };
        } else {
            ctx.body = {
                success: false,
                backMsg: "查询失败！"
            };
        }
    }

    async add() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        const result = await ctx.service.product.add(fieldsValue);
        if (result.affectedRows === 1) {
            ctx.body = {
                success: true,
                backData: result,
                backMsg: "新增用户成功！"
            };
        } else {
            ctx.body = {
                success: false,
                backMsg: "新增失败！"
            };
        }
    }
}

module.exports = HomeController;
