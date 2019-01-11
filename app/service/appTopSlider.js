'use strict';

const Service = require('egg').Service;

class RoleService extends Service {

    //获取app滚动图列表
    async queryList() {
        const topSliderList = await this.ctx.model.AppTopSlider.findAll();
        return topSliderList;
    }

    //增加app滚动图
    async add(fieldsValue) {
        const ctx = this.ctx;
        const row = {
            ...fieldsValue
        };
        const res = await ctx.model.AppTopSlider.create(row);

        return {
            rowsAffected: res,
        };
    }

}

module.exports = RoleService;