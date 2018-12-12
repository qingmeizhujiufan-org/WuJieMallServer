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
}

module.exports = AttachmentService;