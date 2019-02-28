'use strict';

const Service = require('egg').Service;

class TravelService extends Service {

    async queryList(params) {
        const ctx = this.ctx;
        const Sequelize = this.app.Sequelize;
        const Travel = ctx.model.Travel;
        const Attachment = ctx.model.Attachment;
        Travel.belongsTo(Attachment, {foreignKey: 'thumbnail'});
        const {pageNumber = 1, pageSize = 10, keyWords = ''} = params;
        const whereCondition = {
            '$or': {
                travelTheme: {
                    '$like': '%' + keyWords + '%'
                },
            }
        };

        const dataList = await Promise.all([
            Travel.findAll({
                where: whereCondition,
            }),
            Travel.findAll({
                where: whereCondition,
                attributes: [
                    'id',
                    'travelTheme',
                    'travelLastTime',
                    'travelHas',
                    'travelLimiteNumber',
                    'travelBeginTime',
                    'travelEndTime',
                    'travelPrice',
                    'travelFrom',
                    'travelTo',
                    'travelUsecar',
                    'linePlay',
                    'travelDesc',
                    'updateBy',
                    'createBy',
                    'updated_at',
                    'created_at',
                ],
                include: [{
                    model: Attachment,
                    attributes: ['id', 'fileType']
                }],
                order: [
                    ['created_at', 'DESC']
                ],
                limit: pageSize,
                offset: (pageNumber - 1) * pageSize,
            })
        ]);

        return {
            content: dataList[1],
            pageNumber,
            pageSize,
            totalElements: dataList[0].length,
            totalPages: Math.ceil(dataList[0].length / pageSize)
        };
    }

    async queryDetail(params) {
        const ctx = this.ctx;
        const Travel = ctx.model.Travel;
        const TravelDay = ctx.model.TravelDay;
        const {id} = params;
        const res = await ctx.model.Travel.findOne({
            where: {
                id
            },
            include: [{
                associate: Travel.hasMany(TravelDay, {foreignKey: 'travelId', sourceKey: 'id'}),
                model: TravelDay,

            }]
        });

        return res;
    }

    async add(fieldsValue) {
        const ctx = this.ctx;
        const row = {
            ...fieldsValue
        };
        const res = await ctx.model.Travel.create(row);

        return {
            rowsAffected: res,
        };
    }

    async update(fieldsValue) {
        const ctx = this.ctx;
        const {id, ...restFieldsValue} = fieldsValue;
        const res = await ctx.model.Travel.update(restFieldsValue, {
            where: {id}
        });

        return {rowsAffected: res};
    }

    async delete(params) {
        const res = await this.ctx.model.Travel.destroy({
            where: {id: params.id}
        });
        return res;
    }

    async addTravelDay(fieldsValueList) {
        const ctx = this.ctx;
        const res = await ctx.model.TravelDay.bulkCreate(fieldsValueList);

        return {
            rowsAffected: res,
        };
    }

    async updateTravelDay(fieldsValueList) {
        const ctx = this.ctx;
        let updateList = [];
        for (let i = 0; i < fieldsValueList.length; i++) {
            let item = fieldsValueList[i];
            updateList.push(
                ctx.model.TravelDay.update(item, {
                    where: {id: item.id}
                })
            );
        }
        const res = await Promise.all(updateList);

        return {rowsAffected: res};
    }
}

module.exports = TravelService;
