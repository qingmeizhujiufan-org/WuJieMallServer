'use strict';

const Service = require('egg').Service;

class RoleService extends Service {

    //获取app滚动图列表
    async queryList() {
        const ctx = this.ctx;
        const Attachment = ctx.model.Attachment;
        const AppTopSlider = ctx.model.AppTopSlider;
        AppTopSlider.belongsTo(Attachment, {foreignKey: 'imgId'});
        const topSliderList = await AppTopSlider.findAll({
            attributes: [
                'id',
                'productLink',
                'desc',
                'no',
            ],
            include: [{
                model: Attachment,
                attributes: ['id', 'fileType']
            }],
            order: [
                ['created_at', 'DESC']
            ],
        });

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

    //删除app滚动图
    async del(params) {
        const ctx = this.ctx;
        const res = await ctx.model.AppTopSlider.destroy({where: {id: params.id}});

        return {
            rowsAffected: res,
        };
    }

}

module.exports = RoleService;
