'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');

class ProductService extends Service {

    async queryList(params) {
        const {pageNumber, pageSize} = params;
        const res = await this.app.mysql.select('product_info', {
            // where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
            // columns: ['author', 'title'], // 要查询的表字段
            orders: [['create_time', 'desc']], // 排序方式
            limit: pageSize, // 返回数据量
            offset: (pageNumber - 1) * pageSize, // 数据偏移量
        });

        return res;
    }

    async queryDetail(params) {
        const {id} = params;
        const res = await this.app.mysql.get('product_info', {id});

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