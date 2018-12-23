'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');

class AttachmentService extends Service {

    async upload(fieldsValue) {
        const params = {
            id: UUID.v1(),
            ...fieldsValue
        };
        const res = await this.ctx.model.file.create(params);

        return {
            ...res,
            id: params.id
        };
    }

    async queryListByIds(ids) {
        let res = [];
        // if (ids && typeof ids === 'string') {
        //     res = await this.app.mysql.select('file_info', {
        //         where: {id: ids.split(',')},
        //         columns: ['id', 'file_name', 'file_type', 'mime_type', 'create_time'],
        //         orders: [['create_time', 'asc']],
        //     });
        // }

        return res;
    }
}

module.exports = AttachmentService;
