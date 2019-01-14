'use strict';

const BaseController = require('../core/BaseController');

class AppController extends BaseController {
    async queryTopSliderList() {
        const ctx = this.ctx;
        const topSliderList = await ctx.service.appTopSlider.queryList();

        this.success({
            backMsg: "获取app滚动图列表成功！",
            backData: topSliderList
        });
    }

    async queryTopSliderDetail() {
        const ctx = this.ctx;
        const params = ctx.query;
        const result = await ctx.service.appTopSlider.queryDetail(params);

        if (result) {
            const imgId = await ctx.service.attachment.queryListByIds(result.imgId);
            result.imgId = imgId;

            this.success({
                backData: result,
                backMsg: '查询成功！'
            });
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    async addTopSlider() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;

        const result = await ctx.service.appTopSlider.add(fieldsValue);
        if (result.rowsAffected) {
            this.success({
                backMsg: "新增APP滚动图成功！",
                backData: result
            });
        } else {
            this.fail({
                backMsg: "新增失败！"
            });
        }
    }

    async updateTopSlider() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        const result = await ctx.service.appTopSlider.update(fieldsValue);

        if (result.rowsAffected && result.rowsAffected[0] > 0) {
            this.success({
                backData: result,
                backMsg: "修改APP滚动图信息成功！"
            });
        } else {
            this.fail({
                backMsg: "修改APP滚动图信息失败！"
            });
        }
    }

    async delTopSlider() {
        const ctx = this.ctx;
        const params = ctx.request.body;

        const result = await ctx.service.appTopSlider.del(params);
        if (result.rowsAffected) {
            this.success({
                backMsg: "新增APP滚动图成功！",
                backData: result
            });
        } else {
            this.fail({
                backMsg: "新增失败！"
            });
        }
    }
}

module.exports = AppController;
