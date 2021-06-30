const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./items.schema.json');
const ProductInfo = require('./product_infos/product_infos.model');

class Product extends Model {
  static get tableName() {
    return tableNames.product;
  }

  static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
    return {
      product_infos: {
        relation: Model.HasManyRelation,
        modelClass: ProductInfo,
        join: {
          from: `${tableNames.product}.id`,
          to: `${tableNames.product_info}.product_id`,
        },
      },
    };
  }
}

module.exports = Product;
