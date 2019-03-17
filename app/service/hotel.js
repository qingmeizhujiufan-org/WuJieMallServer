'use strict';

const Service = require('egg').Service;

class HotelService extends Service {

    async queryList(params) {
        const ctx = this.ctx;
        const Sequelize = this.app.Sequelize;
        const Hotel = ctx.model.Hotel;
        const Attachment = ctx.model.Attachment;
        Hotel.belongsTo(Attachment, {foreignKey: 'thumbnail'});
        const {pageNumber = 1, pageSize = 10, keyWords = ''} = params;
        const whereCondition = {
            '$or': {
                hotelName: {
                    '$like': '%' + keyWords + '%'
                },
            }
        };

        const dataList = await Promise.all([
            Hotel.findAll({
                where: whereCondition,
            }),
            Hotel.findAll({
                where: whereCondition,
                attributes: [
                    'id',
                    'thumbnail',
                    'hotelName',
                    'telephone',
                    'hotelAddress',
                    'hotelType',
                    'bedModel',
                    'roomSize',
                    'stayPersonNum',
                    'internet',
                    'windowScenery',
                    'window',
                    'bathroom',
                    'breakfast',
                    'drink',
                    'facilities',
                    'payType',
                    'canCancel',
                    'canAddbed',
                    'innerNeed',
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

    async queryListTop3() {
        const ctx = this.ctx;
        const Travel = ctx.model.Travel;
        const Attachment = ctx.model.Attachment;
        Travel.belongsTo(Attachment, {foreignKey: 'thumbnail'});

        const dataList = await Travel.findAll({
            attributes: [
                'id',
                'thumbnail',
                'travelLastTime',
                'travelHas',
                'travelLimiteNumber',
                'travelBeginTime',
                'travelEndTime',
                'manPrice',
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
            limit: 3
        });

        return {
            content: dataList,
        };
    }

    async queryDetail(params) {
        const ctx = this.ctx;
        const Travel = ctx.model.Travel;
        const TravelDay = ctx.model.TravelDay;
        const TravelSign = ctx.model.TravelSign;
        Travel.hasMany(TravelSign, {foreignKey: 'travelId'});
        const {id} = params;
        const res = await ctx.model.Travel.findOne({
            where: {
                id
            },
            include: [{
                associate: Travel.hasMany(TravelDay, {foreignKey: 'travelId', sourceKey: 'id'}),
                model: TravelDay,
            }, {
                associate: Travel.hasMany(TravelSign, {foreignKey: 'travelId', sourceKey: 'id'}),
                model: TravelSign,
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

    async delete(params) {
        const res = await this.ctx.model.Travel.destroy({
            where: {id: params.id}
        });
        return res;
    }

    async deleteTravelDay(params) {
        const res = await this.ctx.model.TravelDay.destroy({
            where: {travelId: params.id}
        });
        return res;
    }

    /* 报名自驾游 */
    async signTravel(fieldsValue) {
        const ctx = this.ctx;
        const row = {
            ...fieldsValue
        };
        const res = await ctx.model.TravelSign.create(row);

        return {
            rowsAffected: res,
        };
    }

    /* 添加参与者 */
    async addParticipants(fieldsValueList) {
        const ctx = this.ctx;
        const res = await ctx.model.TravelSignParticipant.bulkCreate(fieldsValueList);

        return {
            rowsAffected: res,
        };
    }
}

module.exports = HotelService;
