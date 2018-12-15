'use strict';

const Service = require('egg').Service;
const UUID = require('uuid');

class ProductService extends Service {

    async queryList(params) {
        const ctx = this.ctx;
        const {pageNumber, pageSize} = params;
        const total = await ctx.model.Product.findAll({
            where: {shop_id: '123456789', product_category_id: '123'}
        });
        const res = await ctx.model.Product.findAll({
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
        const ctx = this.ctx;
        const {id} = params;
        const res = await ctx.model.Product.findOne({
            where: {id}
        });

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
        const ctx = this.ctx;
        const row = {
            ...fieldsValue,
            update_time: new Date()
        };
        const {id, ...restFieldsValue} = row;
        const res = await ctx.model.Product.update(restFieldsValue, {
            where: {id}
        });

        return res;
    }
}

module.exports = ProductService;