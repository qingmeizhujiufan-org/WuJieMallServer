'use strict';

const Moment = require('moment');

module.exports = app => {
    const {UUIDV1, INTEGER, STRING, DECIMAL, DATE} = app.Sequelize;
    const Product = app.model.define('Product', {
        /* 产品ID */
        id: {
            type: UUIDV1,
            primaryKey: true,
            field: 'id',
            defaultValue: UUIDV1
        },
        /* 产品店铺ID */
        shopId: {
            type: STRING(255),
            field: 'shop_id'
        },
        /* 产品分类ID */
        productCategoryId: {
            type: STRING(255),
            field: 'product_category_id'
        },
        /* 产品编码 */
        productCode: {
            type: STRING(255),
            field: 'product_code'
        },
        /* 产品名称 */
        productName: {
            type: STRING(255),
            field: 'product_name'
        },
        /* 产品简介 */
        productSummary: {
            type: STRING(255),
            field: 'product_summary'
        },
        /* 产品售价 */
        productSellingprice: {
            type: DECIMAL,
            field: 'product_sellingprice'
        },
        /* 产品成本价 */
        productCostprice: {
            type: DECIMAL,
            field: 'product_costprice',
            get() {
                return this.getDataValue('productCostprice') && parseFloat(this.getDataValue('productCostprice'));
            }
        },
        /* 产品单位 */
        productUnit: {
            type: STRING(255),
            field: 'product_unit'
        },
        /* 产品规格 */
        productSpec: {
            type: STRING(255),
            field: 'product_spec'
        },
        /* 产品型号 */
        productModel: {
            type: STRING(255),
            field: 'product_model'
        },
        /* 产品状态 */
        productState: {
            type: INTEGER,
            field: 'product_state'
        },
        /* 产品产地 */
        productOrigin: {
            type: STRING(255),
            field: 'product_origin'
        },
        /* 产品食用 */
        productUsage: {
            type: STRING(255),
            field: 'product_usage'
        },
        /* 产品贮藏办法 */
        productStorage: {
            type: STRING(255),
            field: 'product_storage'
        },
        /* 产品口味 */
        productTaste: {
            type: STRING(255),
            field: 'product_taste'
        },
        /* 配送范围 */
        distributionScope: {
            type: STRING(255),
            field: 'distribution_scope'
        },
        /* 产品品牌 */
        productBrand: {
            type: STRING(255),
            field: 'product_brand'
        },
        /* 产品配料 */
        productBatching: {
            type: STRING(255),
            field: 'product_batching'
        },
        /* 产品保质期 */
        productDate: {
            type: STRING(255),
            field: 'product_date',
            get() {
                return this.getDataValue('productDate') && Moment(this.getDataValue('productDate')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        /* 产品净含量 */
        productNetWeight: {
            type: STRING(255),
            field: 'product_net_weight'
        },
        /* 产品示意图 */
        headerPic: {
            type: STRING(500),
            field: 'header_pic'
        },
        /* 产品详情图 */
        detailPic: {
            type: STRING(500),
            field: 'detail_pic'
        },
        /* 备注 */
        mark: {
            type: STRING(255),
            field: 'mark'
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
        tableName: 'product_info',
        timestamps: true,
    });
    return Product;
};