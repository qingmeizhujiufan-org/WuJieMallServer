'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');

class ProductService extends Service {

    async queryList(params) {
        const {pageNumber, pageSize} = params;
        const total = await this.app.mysql.select('product_info', {
            where: {shop_id: '123456789', product_category_id: '123'}
        });
        const res = await this.app.mysql.select('product_info', {
            where: {shop_id: '123456789', product_category_id: '123'},
            orders: [['create_time', 'desc']], // 排序方式
            limit: pageSize, // 返回数据量
            offset: (pageNumber - 1) * pageSize, // 数据偏移量
        });

        return {
            content: res,
            totalElements: total.length
        };
    }

    async queryDetail(params) {
        const {id} = params;
        const res = await this.app.mysql.get('product_info', {id});

        return res;
    }

    async add(fieldsValue) {
        const row = {
            id: UUID.v1(),
            ...fieldsValue,
            create_time: this.app.mysql.literals.now
        };
        const res = await this.app.mysql.insert('product_info', row);

        return {
            ...res,
            id: row.id
        };
    }

    async update(fieldsValue) {
        const row = {
            ...fieldsValue,
            update_time: this.app.mysql.literals.now
        };
        const res = await this.app.mysql.update('product_info', row);

        return res;
    }
}

module.exports = ProductService;