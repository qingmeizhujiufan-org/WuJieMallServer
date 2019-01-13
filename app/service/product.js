'use strict';

const Service = require('egg').Service;

class ProductService extends Service {

    async queryList(params) {
        const ctx = this.ctx;
        const Sequelize = this.app.Sequelize;
        const Shop = ctx.model.Shop;
        const ProductCategory = ctx.model.ProductCategory;
        const Product = ctx.model.Product;
        Product.belongsTo(Shop, {foreignKey: 'shopId'});
        Product.belongsTo(ProductCategory, {foreignKey: 'productCategoryId'});
        const {pageNumber = 1, pageSize = 10, keyWords = ''} = params;
        const whereCondition = {
            '$or': {
                productName: {
                    '$like': '%' + keyWords + '%'
                },
                productBrand: {
                    '$like': '%' + keyWords + '%'
                },
                productOrigin: {
                    '$like': '%' + keyWords + '%'
                },
            }
        };

        const dataList = await Promise.all([
            Product.findAll({
                where: whereCondition,
            }),
            Product.findAll({
                where: whereCondition,
                attributes: [
                    'id',
                    'shopId',
                    [Sequelize.col('Shop.shop_name'), 'shopName'],
                    'productCategoryId',
                    [Sequelize.col('ProductCategory.product_category_name'), 'productCategoryName'],
                    'productCode',
                    'productName',
                    'productSummary',
                    'productSellingprice',
                    'productCostprice',
                    'productUnit',
                    'productSpec',
                    'productModel',
                    'productState',
                    'productOrigin',
                    'productUsage',
                    'productStorage',
                    'productTaste',
                    'distributionScope',
                    'productBrand',
                    'productBatching',
                    'productDate',
                    'productNetWeight',
                    'mark',
                    'update_by',
                    'create_by',
                    'updated_at',
                    'created_at',
                ],
                include: [{
                    model: Shop,
                    attributes: []
                }, {
                    model: ProductCategory,
                    attributes: []
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
            totalElements: dataList[0].length
        };
    }

    async findProductByShopId(params) {
        const {id} = params;
        const res = await this.ctx.model.Product.findAll({
            where: {shopId: id}
        });
        return res
    }

    async findProductByCategoryId(params) {
        const {id} = params;
        const res = await this.ctx.model.Product.findAll({
            where: {productCategoryId: id}
        });
        return res
    }

    async queryDetail(params) {
        const ctx = this.ctx;
        const {id} = params;
        const res = await ctx.model.Product.findById(id);

        return res;
    }

    async add(fieldsValue) {
        const ctx = this.ctx;
        const row = {
            ...fieldsValue
        };
        const res = await ctx.model.Product.create(row);

        return {
            rowsAffected: res,
        };
    }

    async update(fieldsValue) {
        const ctx = this.ctx;
        const {id, ...restFieldsValue} = fieldsValue;
        const res = await ctx.model.Product.update(restFieldsValue, {
            where: {id}
        });

        return {rowsAffected: res};
    }

    async delete(params) {
        const res = await this.ctx.model.Product.destroy({
            where: {id: params.id}
        });
        return res;
    }

    //查询所有分类
    async queryAllCategoryList() {
        const ctx = this.ctx;
        const total = await ctx.model.ProductCategory.findAll();
        return total
    }

    //产品类别
    async queryCategoryList(params) {
        const ctx = this.ctx;
        const ProductCategory = ctx.model.ProductCategory;
        const {pageNumber, pageSize, keyWords = ''} = params;
        const whereCondition = {
            '$or': {
                productCategoryName: {
                    '$like': '%' + keyWords + '%'
                }
            }
        };

        const dataList = await Promise.all([
            ProductCategory.findAll({
                where: whereCondition,
            }),
            ProductCategory.findAll({
                where: whereCondition,
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
            totalElements: dataList[0].length
        };

    }

    async categoryAdd(row) {
        const ctx = this.ctx;
        const res = await ctx.model.ProductCategory.findOrCreate({
            where: {productCategoryName: row.productCategoryName},
            defaults: {...row}
        });

        return res;
    }

    async categoryDetail(params) {
        const ctx = this.ctx;
        const {id} = params;
        const res = await ctx.model.ProductCategory.findById(id);

        return res;
    }

    async categoryUpdate(fieldsValue) {
        const ctx = this.ctx;
        const {id, ...restFieldsValue} = fieldsValue;
        const res = await ctx.model.ProductCategory.update(restFieldsValue, {
            where: {id}
        });

        return res;
    }

    async categoryDelete(params) {
        const {id} = params;
        const res = await this.ctx.model.ProductCategory.destroy({
            where: {id}
        });
        return res;
    }
}

module.exports = ProductService;
