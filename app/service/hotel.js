'use strict';

const Service = require('egg').Service;

class HotelService extends Service {

  async queryList(params) {
    const ctx = this.ctx;
    const Sequelize = this.app.Sequelize;
    const Hotel = ctx.model.Hotel;
    const Attachment = ctx.model.Attachment;
    Hotel.belongsTo(Attachment, { foreignKey: 'thumbnail' });
    const { pageNumber = 1, pageSize = 10, keyWords = '' } = params;
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
          'headerPic',
          'detailPic',
          'hotelName',
          'keeperName',
          'IDNumber',
          'telephone',
          'hotelPhone',
          'hotelAddress',
          'hotelType',
          'hotelTypeText',
          'hotelStatus',
          'hotelStatusText',
          'initialCharge',
          'state',
          'updateBy',
          'createBy',
          'updated_at',
          'created_at'

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
    const Hotel = ctx.model.Hotel;
    const Attachment = ctx.model.Attachment;
    Hotel.belongsTo(Attachment, { foreignKey: 'thumbnail' });

    const dataList = await Hotel.findAll({
      attributes: [
        'id',
        'thumbnail',
        'headerPic',
        'detailPic',
        'hotelName',
        'telephone',
        'hotelPhone',
        'hotelAddress',
        'hotelType',
        'hotelStatus',
        'state',
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

  async queryMobileList(params) {
    const ctx = this.ctx;
    const Sequelize = this.app.Sequelize;
    const Hotel = ctx.model.Hotel;
    const Attachment = ctx.model.Attachment;
    Hotel.belongsTo(Attachment, { foreignKey: 'thumbnail' });
    const { pageNumber = 1, pageSize = 10, keyWords = '' } = params;
    const whereCondition = {
      '$or': {
        hotelName: {
          '$like': '%' + keyWords + '%'
        },
      },
      '$and': {
        state: 2
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
          'headerPic',
          'detailPic',
          'hotelName',
          'telephone',
          'hotelPhone',
          'hotelAddress',
          'hotelType',
          'hotelTypeText',
          'hotelStatus',
          'hotelStatusText',
          'initialCharge',
          'state',
          'updateBy',
          'createBy',
          'updated_at',
          'created_at'

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
    const Hotel = ctx.model.Hotel;
    const { id } = params;
    const res = await ctx.model.Hotel.findOne({
      where: {
        id
      }
    });

    return res;
  }

  async add(fieldsValue) {
    const ctx = this.ctx;
    const row = {
      ...fieldsValue
    };
    const res = await ctx.model.Hotel.create(row);

    return {
      rowsAffected: res,
    };
  }

  async update(fieldsValue) {
    const ctx = this.ctx;
    const { id, ...restFieldsValue } = fieldsValue;
    const res = await ctx.model.Hotel.update(restFieldsValue, {
      where: { id }
    });

    return { rowsAffected: res };
  }

  async delete(params) {
    const res = await this.ctx.model.Hotel.destroy({
      where: { id: params.id }
    });
    return res;
  }

  /* 查询旅游订单 */
  async queryOrderList(params) {
    const ctx = this.ctx;
    const Sequelize = this.app.Sequelize;
    const Hotel = ctx.model.Hotel;
    const Room = ctx.model.Room;
    const HotelRoomReserve = ctx.model.HotelRoomReserve;
    const TravelSignParticipant = ctx.model.TravelSignParticipant;
    HotelRoomReserve.belongsTo(Hotel, { foreignKey: 'hotelId', targetKey: 'id' });
    HotelRoomReserve.belongsTo(Room, { foreignKey: 'roomId', targetKey: 'id' });
    const { pageNumber = 1, pageSize = 10, keyWords = '' } = params;

    const whereCondition = {
      '$or': {
        orderId: {
          '$like': '%' + keyWords + '%'
        }
      }
    };
    if (params.keeperId !== undefined) {
      whereCondition.keeperId = params.keeperId
    }
    if (params.userId !== undefined) {
      whereCondition.userId = params.userId
    }

    const dataList = await Promise.all([
      TravelSign.findAll({
        where: whereCondition,
      }),
      TravelSign.findAll({
        where: whereCondition,
        attributes: [
          'id',
          'hotelId',
          'roomId',
          'userId',
          'userId',
          'keeperId',
          'beginDate',
          'endDate',
          'days',
          'person',
          'status',
          'totalMoney',
          'state',
          'updated_at',
          'created_at',
        ],
        include: [{
          model: TravelSignParticipant
        }, {
          model: Travel
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

  async orderCheck(fieldsValue) {
    const ctx = this.ctx;
    const { id, ...restFieldsValue } = fieldsValue;
    const res = await ctx.model.HotelRoomReserve.update(restFieldsValue, {
      where: { id }
    });

    return { rowsAffected: res };
  }
}

module.exports = HotelService;