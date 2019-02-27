'use strict';

const BaseController = require('../core/BaseController');
const uuidv1 = require('uuid/v1');

class TravelController extends BaseController {
    async queryList() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.pageNumber = ctx.helper.parseInt(params.pageNumber);
        params.pageSize = ctx.helper.parseInt(params.pageSize);
        const result = await ctx.service.travel.queryList(params);
        if (result) {
            this.success({
                backData: result,
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }

    async queryDetail() {
        const ctx = this.ctx;
        const params = ctx.query;
        const result = await ctx.service.travel.queryDetail(params);

        if (result) {
            const headerPicList = await ctx.service.attachment.queryListByIds(result.headerPic);
            const detailPicList = await ctx.service.attachment.queryListByIds(result.detailPic);
            result.headerPic = headerPicList;
            result.detailPic = detailPicList;

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
        fieldsValue.id = uuidv1();
        const result = await ctx.service.travel.add(fieldsValue);
        const travelDay = fieldsValue.travelDay;
        travelDay.map(item => {
            item.travelId = fieldsValue.id;
        });
        const result_travel_day = await ctx.service.travel.addTravelDay(travelDay);

        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "新增主题旅游成功！"
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
        const result = await ctx.service.travel.update(fieldsValue);

        if (result.rowsAffected && result.rowsAffected[0] > 0) {
            this.success({
                backData: result,
                backMsg: "修改主题旅游信息成功！"
            });
        } else {
            this.fail({
                backMsg: "修改主题旅游信息失败！"
            });
        }
    }

    async delete() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        const result = await ctx.service.product.delete(params);

        if (result) {
            this.success({
                backMsg: "删除产品信息成功！"
            });
        } else {
            this.fail({
                backMsg: "删除产品信息失败！"
            });
        }
    }
}

module.exports = TravelController;
