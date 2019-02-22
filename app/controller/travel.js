'use strict';

const BaseController = require('../core/BaseController');

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
        const result = await ctx.service.travel.add(fieldsValue);

        if (result.rowsAffected) {
            try {
                /* 广播新增产品消息给管理员及时审核 */
                const {app} = this;
                const nsp = app.io.of('/');

                try {
                    nsp.emit('review_product', '有新产品等待审核，请及时处理');
                } catch (error) {
                    app.logger.error(error);
                }
            } catch (e) {

            }

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
