'use strict';

const BaseController = require('../core/BaseController');
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');
const images = require('images');

class AttachmentController extends BaseController {

    async upload() {
        const ctx = this.ctx;
        const stream = await ctx.getFileStream();
        // console.log('stream == ', stream);
        const filename = stream.filename;
        const result = await ctx.service.attachment.upload({
            fileName: filename,
            fileType: path.extname(filename),
            mimeType: stream.mimeType,
            // file_size: readableState.length,
            // file_path: `app/upload/${filename}`
        });

        if (result.rowsAffected) {
            let buffer = [];
            stream.on('data', data => buffer.push(data));
            stream.on('end', () => Buffer.concat(buffer));
            const size = images(buffer).size();
            console.log('buffer == ', buffer);
            console.log('size == ', size);
            const target = path.join(this.config.baseDir, 'app/public', result.id + path.extname(filename));
            const writeStream = fs.createWriteStream(target);
            await pump(stream, writeStream);

            this.success({
                id: result.id
            });
        } else {
            this.fail({
                backMsg: '上传失败'
            });
        }
    }

    async queryListByIds() {
        const ctx = this.ctx;
        const params = ctx.query;
        console.log('params === ', params.ids);
        if (!params.ids) {
            this.fail({backMsg: "缺少参数ids！"});
        } else {
            const result = await ctx.service.attachment.queryListByIds(params.ids);
            if (result) {
                this.success({
                    backData: result,
                    backMsg: '查询成功！'
                });
            } else {
                this.fail({backMsg: "查询失败！"});
            }
        }
    }
}

module.exports = AttachmentController;
