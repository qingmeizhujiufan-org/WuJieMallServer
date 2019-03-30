'use strict';

const Service = require('egg').Service;

class RoomService extends Service {

  async queryList(params) {
    const ctx = this.ctx;
    const Sequelize = this.app.Sequelize;
    const Room = ctx.model.Room;
    const Attachment = ctx.model.Attachment;
    Room.belongsTo(Attachment, { foreignKey: 'thumbnail' });
    const { pageNumber = 1, pageSize = 10, keyWords = '', hotelId } = params;
    const whereCondition = {
      '$or': {
        roomName: {
          '$like': '%' + keyWords + '%'
        },
      },
      '$and': {
        hotelId: hotelId
      }
    };

    const dataList = await Promise.all([
      Room.findAll({
        where: whereCondition,
      }),
      Room.findAll({
        where: whereCondition,
        attributes: [
          'id',
          'detailPic',
          'hotelId',
          'roomName',
          'roomType',
          'roomPrice',
          'roomNumber',
          'roomRemain',
          'roomStatus',
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
          'sale',
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
    const Room = ctx.model.Room;
    const Attachment = ctx.model.Attachment;
    Room.belongsTo(Attachment, { foreignKey: 'thumbnail' });

    const dataList = await Room.findAll({
      attributes: [
        'id',
        'thumbnail',
        'RoomLastTime',
        'RoomHas',
        'RoomLimiteNumber',
        'RoomBeginTime',
        'RoomEndTime',
        'manPrice',
        'RoomFrom',
        'RoomTo',
        'RoomUsecar',
        'linePlay',
        'RoomDesc',
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
    const Room = ctx.model.Room;
    const { id } = params;
    const res = await ctx.model.Room.findOne({
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
    const res = await ctx.model.Room.create(row);

    return {
      rowsAffected: res,
    };
  }

  async update(fieldsValue) {
    const ctx = this.ctx;
    const { id, ...restFieldsValue } = fieldsValue;
    const res = await ctx.model.Room.update(restFieldsValue, {
      where: { id }
    });

    return { rowsAffected: res };
  }

  async delete(params) {
    const res = await this.ctx.model.Room.destroy({
      where: { id: params.id }
    });
    return res;
  }

  async addRoomDay(fieldsValueList) {
    const ctx = this.ctx;
    const res = await ctx.model.RoomDay.bulkCreate(fieldsValueList);

    return {
      rowsAffected: res,
    };
  }

  async updateRoomDay(fieldsValueList) {
    const ctx = this.ctx;
    let updateList = [];
    for (let i = 0; i < fieldsValueList.length; i++) {
      let item = fieldsValueList[i];
      updateList.push(
        ctx.model.RoomDay.update(item, {
          where: { id: item.id }
        })
      );
    }
    const res = await Promise.all(updateList);

    return { rowsAffected: res };
  }

  async deleteRoomDay(params) {
    const res = await this.ctx.model.RoomDay.destroy({
      where: { RoomId: params.id }
    });
    return res;
  }
}

module.exports = RoomService;