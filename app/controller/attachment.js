'use strict';

const fs = require('fs');
const path = require('path');
//管道读入一个虫洞
const sendToWormhole = require('stream-wormhole');
const toArray = require('stream-to-array');
const Controller = require('egg').Controller;
const pump = require('mz-modules/pump');
//异步二进制 写入流
// const awaitWriteStream = require('await-stream-ready').write;

class AttachmentController extends Controller {

    async upload() {
        const ctx = this.ctx;
        const stream = await ctx.getFileStream();
        console.log('stream == ', stream);
        // const filename = encodeURIComponent(stream.fieldname) + path.extname(stream.filename).toLowerCase();
        const filename = stream.filename;
        const target = path.join(this.config.baseDir, 'app/upload', filename);
        const writeStream = fs.createWriteStream(target);
        await pump(stream, writeStream);

        ctx.body = {
            url: '/upload/' + filename
        };
    }
}

module.exports = AttachmentController;
