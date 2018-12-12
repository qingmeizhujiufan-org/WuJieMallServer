'use strict';

const BaseController = require('../core/BaseController');
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');

class AttachmentController extends BaseController {

    async upload() {
        const ctx = this.ctx;
        const stream = await ctx.getFileStream();
        console.log('stream == ', stream);
        // console.log(' _readableState == ', stream._readableState.ReadableState);
        // const readableState = stream._readableState.ReadableState;
        const filename = stream.filename;
        const result = await ctx.service.attachment.upload({
            file_name: filename,
            mime_type: stream.mimeType,
            // file_size: readableState.length,
            // file_path: `app/upload/${filename}`
        });
        console.log('result == ', result);
        if (result.affectedRows === 1) {
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
}

module.exports = AttachmentController;
