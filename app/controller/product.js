'use strict';

const BaseController = require('../core/BaseController');

class HomeController extends BaseController {
    async queryList() {
        const ctx = this.ctx;
        const params = ctx.query;
        const result = await ctx.service.product.queryList(params);
        if (result) {
            this.success({
                backData: {
                    content: result,
                    pageSize: parseInt(params.pageSize),
                    pageNumber: parseInt(params.pageNumber),
                    totalElements: result.length
                },
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    async queryDetail() {
        const ctx = this.ctx;
        const params = ctx.query;
        const result = await ctx.service.product.queryDetail(params);
        if (result) {
            this.success({
                backData: result,
                backMsg: '查询成功！'
            });
        }else {
            this.fail({backMsg: "查询失败！"});
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
