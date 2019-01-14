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

    async addTopSlider() {
        const ctx = this.ctx;
        const params = ctx.request.body;

        const result = await ctx.service.appTopSlider.add(params);
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