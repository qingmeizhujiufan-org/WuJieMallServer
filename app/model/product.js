'use strict';
module.exports = app => {
    const {INTEGER, STRING, DECIMAL} = app.Sequelize;
    const Product = app.model.define('Product', {
        id: {
            type: STRING(255),
            primaryKey: true,
            field: 'id'
        },
        shopId: {
            type: STRING(255),
            field: 'shop_id'
        },
        productCategoryId: {
            type: STRING(255),
            field: 'product_category_id'
        },
        productCode: {
            type: STRING(255),
            field: 'product_code'
        },
        productName: {
            type: STRING(255),
            field: 'product_name'
        },
        productSummary: {
            type: STRING(255),
            field: 'product_summary'
        },
        productSellingprice: {
            type: DECIMAL,
            field: 'product_sellingprice'
        },
        productCostprice: {
            type: DECIMAL,
            field: 'product_costprice'
        },
        productUnit: {
            type: STRING(255),
            field: 'product_unit'
        },
        productSpec: {
            type: STRING(255),
            field: 'product_spec'
        },
        productModel: {
            type: STRING(255),
            field: 'product_model'
        },
        productState: {
            type: INTEGER,
            field: 'product_state'
        },
        productOrigin: {
            type: STRING(255),
            field: 'product_origin'
        },
        productUsage: {
            type: STRING(255),
            field: 'product_usage'
        },
        headerPic: {
            type: STRING(500),
            field: 'header_pic'
        },
        detailPic: {
            type: STRING(500),
            field: 'detail_pic'
        },
    }, {
        freezeTableName: true,
        tableName: 'product_info',
        timestamps: false,
    });
    return Product;
};