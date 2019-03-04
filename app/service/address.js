'use strict';

const Service = require('egg').Service;

class AddressService extends Service {

    async queryList(params = {}) {
        const ctx = this.ctx;
        const Address = ctx.model.Address;

        const res = await Address.findAll({
            where: params
        })

        return res
    }


    async add(row) {
        const ctx = this.ctx;
        const res = await ctx.model.Address.create(row);

        return {
            rowsAffected: res,
        };
    }

    async update(params) {
        const res = await this.ctx.model.Address.update(params, {
            where: {id: params.id}
        });

        return {rowsAffected: res};
    }

    async delete(params) {
        const {id} = params;
        const res = await this.ctx.model.Address.destroy({
            where: {id}
        });
        return res;
    }
}

module.exports = AddressService;
