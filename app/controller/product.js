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
                    content: result,
                    pageSize: params.pageSize,
                    pageNumber: params.pageNumber,
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
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    async add() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        const result = await ctx.service.product.add(fieldsValue);
        if (result.affectedRows === 1) {
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
        if (result.affectedRows === 1) {
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
}

module.exports = HomeController;
