'use strict';

const BaseController = require('../core/BaseController');
const uuidv1 = require('uuid/v1');

class HotelController extends BaseController {
    async queryList() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.pageNumber = ctx.helper.parseInt(params.pageNumber);
        params.pageSize = ctx.helper.parseInt(params.pageSize);
        const result = await ctx.service.hotel.queryList(params);
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
        const result = await ctx.service.hotel.queryDetail(params);

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
        const result = await ctx.service.hotel.add(fieldsValue);

        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "新增特色民宿成功！"
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
        const result = await ctx.service.hotel.update(fieldsValue);
        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "修改民宿信息成功！"
            });
        } else {
            this.fail({
                backMsg: "修改民宿信息失败！"
            });
        }
    }

    async delete() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        const result = await ctx.service.travel.delete(params);
        const result_travel_day = await  ctx.service.travel.deleteTravelDay(params);

        if (result) {
            this.success({
                backMsg: "删除主题旅游信息成功！"
            });
        } else {
            this.fail({
                backMsg: "删除失败！"
            });
        }
    }

    /* 报名自驾游 */
    async signTravel() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        fieldsValue.id = uuidv1();
        const result = await ctx.service.travel.signTravel(fieldsValue);
        const participants = fieldsValue.participants;
        participants.map(item => {
            item.travelSignId = fieldsValue.id;
        });
        const result_travel_sign_participants = await ctx.service.travel.addParticipants(participants);

        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "报名成功！"
            });
        } else {
            this.fail({
                backMsg: "报名失败！"
            });
        }
    }

    /* 获取最新三条主题旅游信息 */
    async queryListTop3() {
        const ctx = this.ctx;
        const result = await ctx.service.hotel.queryListTop3();
        if (result) {
            this.success({
                backData: result,
                backMsg: "查询列表成功！"
            })
        } else {
            this.fail({backMsg: "查询失败！"});
        }
    }
}

module.exports = HotelController;
