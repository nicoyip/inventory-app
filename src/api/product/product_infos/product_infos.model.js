const { Model } = require('objection');

const tableNames = require('../../../constants/tableNames');
const schema = require('./product_infos.schema.json');

class ProductInfos extends Model {
  static get tableName() {
    return tableNames.product_info;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = ProductInfos;
