'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, INTEGER, STRING, DECIMAL, DATE, TEXT} = app.Sequelize;
    const HotelRoomReserve = app.model.define('HotelRoomReserve', {
        /* 民宿ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id',
            defaultValue: UUIDV1,
        },
        /* hotel ID */
        hotelId: {
            type: STRING(255),
            field: 'hotel_id'
        },
        /* room ID */
        roomId: {
            type: STRING(255),
            field: 'room_id'
        },
        /* 开始日期 */
        beginDate: {
            type: DATE,
            field: 'begin_date'
        },
        /* 结束日期 */
        endDate: {
            type: DATE,
            field: 'end_date'
        },
        /* 住店天数 */
        days: {
            type: INTEGER,
            field: 'days'
        },
        /* 住点人姓名 */
        person: {
            type: STRING(32),
            field: 'person'
        },

        /* 住点人电话*/
        telephone: {
            type: STRING(11),
            field: 'telephone'
        },
        /* 订单状态*/
        stuatus: {
            type: INTEGER,
            field: 'stuatus'
        },
        created_at: {
            type: DATE,
            get() {
                return this.getDataValue('created_at') && Moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updated_at: {
            type: DATE,
            get() {
                return this.getDataValue('updated_at') && Moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'hotel_room_reserve_info',
        timestamps: true,
    });
    return HotelRoomReserve;
};
