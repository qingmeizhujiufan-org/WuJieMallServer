'use strict';

const Controller = require('egg').Controller;

class AttachmentController extends Controller {

    async upload() {
        const ctx = this.ctx;
        const fieldsValue = ctx.request.body;
        const result = await ctx.service.attachment.upload(fieldsValue);
        if (result.affectedRows === 1) {
            ctx.body = {
                success: true,
                backData: result,
                backMsg: "上传成功！"
            };
        } else {
            ctx.body = {
                success: false,
                backMsg: "上传失败！"
            };
        }
    }
}

module.exports = AttachmentController;
