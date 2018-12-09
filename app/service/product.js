'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');

class ProductService extends Service {

    async queryList() {
        const res = await this.app.mysql.select('product_info');

        return res;
    }

    async add(fieldsValue) {
        const params = {
            id: UUID.v1(),
            ...fieldsValue,
        };
        const res = await this.app.mysql.insert('product_info', params);

        return {
            ...res,
            id: params.id
        };
    }
}

module.exports = ProductService;