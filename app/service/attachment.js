'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');

class AttachmentService extends Service {

    async upload(fieldsValue) {
        const params = {
            id: UUID.v1(),
            ...fieldsValue,
            create_time: this.app.mysql.literals.now
        };
        const res = await this.app.mysql.insert('file_info', params);

        return {
            ...res,
            id: params.id
        };
    }

    async queryListByIds(ids) {
        const res = await this.app.mysql.select('file_info', {
            where: {id: ids.split(',')},
            columns: ['id', 'file_name', 'file_type', 'mime_type', 'create_time'],
            orders: [['create_time', 'asc']],
        });

        return res;
    }
}

module.exports = AttachmentService;