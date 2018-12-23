'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, STRING, DATE} = app.Sequelize;
    const Shop = app.model.define('shop', {
        /* 店铺ID */
        shopId: {
            type: UUIDV1,
            primaryKey: true,
            field: 'shop_id',
            defaultValue: UUIDV1
        },

        //店铺名称
        shopName: {
            type: STRING(255),
            field: 'shop_name'
        },
        //店铺地址
        shopAddress: {
            type: STRING(255),
            field: 'shop_address'
        },
        //店铺状态
        shopStatus: {
            type: STRING(255),
            field: 'shop_status'
        },
        //店铺拥有者
        shopOwner: {
            type: STRING(255),
            field: 'shop_owner'
        },
        //店铺图片
        shopPic: {
            type: STRING(255),
            field: 'shop_pic'
        },
        //店铺创建者
        createBy: {
            type: STRING(255),
            field: 'create_by'
        },
        //创建时间
        createdAt: {
            type: DATE,
            field: 'created_at',
            get() {
                return this.getDataValue('created_at') && Moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        //修改人
        updatedAt: {
            type: DATE,
            field: 'update_by',
            get() {
                return this.getDataValue('created_at') && Moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        //修改时间
        updatedAt: {
            type: DATE,
            field: 'updated_at',
            get() {
                return this.getDataValue('created_at') && Moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        freezeTableName: true,
        tableName: 'shop_info',
        timestamps: true,
    });
    return Shop;
};
