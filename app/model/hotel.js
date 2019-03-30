'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, INTEGER, STRING, DECIMAL, DATE, TEXT} = app.Sequelize;
    const Hotel = app.model.define('Hotel', {
        /* 民宿ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id',
            defaultValue: UUIDV1,
        },
        /* 民宿缩略图 */
        thumbnail: {
            type: STRING(255),
            field: 'thumbnail'
        },
        /* 民宿图 */
        headerPic: {
            type: STRING(255),
            field: 'header_pic'
        },
        /* 民宿详情图 */
        detailPic: {
            type: STRING(255),
            field: 'detail_pic'
        },
        /* 民宿名称 */
        hotelName: {
            type: STRING(255),
            field: 'hotel_name'
        },
        /* 咨询电话 */
        telephone: {
            type: STRING(32),
            field: 'telephone'
        },
        /* 固定电话 */
        hotelPhone: {
            type: STRING(32),
            field: 'hotel_phone'
        },
        /* 地址 */
        hotelAddress: {
            type: STRING(255),
            field: 'hotel_address'
        },
        /* 民宿类型 */
        hotelType: {
            type: INTEGER,
            field: 'hotel_type'
        },
        /* 民宿状态 */
        hotelStatus: {
            type: INTEGER,
            field: 'hotel_status'
        },
        // 备注
        mark: {
            type: STRING(255),
            field: 'hotel_mark'
        },
        /* 民宿状态明文 */
        // hotelTypeText: {
        //     type: STRING(255),
        //     field: 'hotel_status_text'
        // },
        /* 床型 */
        bedModel: {
            type: DECIMAL,
            field: 'bed_model'
        },
        /* 房间大小 */
        roomSize: {
            type: DATE,
            field: 'room_size'
        },
        /* 可入住人数 */
        stayPersonNum: {
            type: DATE,
            field: 'stay_person_num'
        },
        /* 网络 */
        internet: {
            type: DECIMAL,
            field: 'internet'
        },
        /* 窗景 */
        windowScenery: {
            type: DECIMAL,
            field: 'window_scenery'
        },
        /* 窗户 */
        window: {
            type: STRING(255),
            field: 'window'
        },
        /* 卫浴 */
        bathroom: {
            type: STRING(255),
            field: 'bathroom'
        },
        /* 早餐 */
        breakfast: {
            type: STRING(255),
            field: 'breakfast'
        },
        /* 饮品 */
        drink: {
            type: STRING(255),
            field: 'drink'
        },
        /* 设施 */
        facilities: {
            type: TEXT,
            field: 'facilities'
        },
        /* 支付类型 */
        payType: {
            type: TEXT,
            field: 'pay_type'
        },
        /* 是否可以取消 */
        canCancel: {
            type: STRING(255),
            field: 'can_cancel'
        },
        /* 是否可以加床 */
        canAddbed: {
            type: STRING(255),
            field: 'can_addbed'
        },
        /* 内宾 */
        innerNeed: {
            type: STRING(255),
            field: 'inner_need'
        },
        /* 修改人 */
        updateBy: {
            type: STRING(255),
            field: 'update_by'
        },
        /* 创建人 */
        createBy: {
            type: STRING(255),
            field: 'create_by'
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
        tableName: 'hotel_info',
        timestamps: true,
    });
    return Hotel;
};