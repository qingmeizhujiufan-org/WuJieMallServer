'use strict';

const BaseController = require('../core/BaseController');
const uuidv1 = require('uuid/v1');

class RoomController extends BaseController {
    async queryList() {
        const ctx = this.ctx;
        const params = ctx.query;
        params.pageNumber = ctx.helper.parseInt(params.pageNumber);
        params.pageSize = ctx.helper.parseInt(params.pageSize);
        const result = await ctx.service.room.queryList(params);
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
        const result = await ctx.service.room.queryDetail(params);

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
        fieldsValue.roomRemian = fieldsValue.roomNumber;
        const result = await ctx.service.room.add(fieldsValue);

        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "新增民宿房间成功！"
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
        const result = await ctx.service.room.update(fieldsValue);
      
        if (result.rowsAffected) {
            this.success({
                backData: result,
                backMsg: "修改民宿房间信息成功！"
            });
        } else {
            this.fail({
                backMsg: "修改民宿房间信息失败！"
            });
        }
    }

    async delete() {
        const ctx = this.ctx;
        const params = ctx.request.body;
        const result = await ctx.service.room.delete(params);
       
        if (result) {
            this.success({
                backMsg: "删除民宿房间信息成功！"
            });
        } else {
            this.fail({
                backMsg: "删除失败！"
            });
        }
    }


    /* 获取最新三条民宿房间信息 */
    async queryListTop3() {
        const ctx = this.ctx;
        const result = await ctx.service.travel.queryListTop3();
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

module.exports = RoomController;
