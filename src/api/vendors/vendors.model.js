const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');

class vendor extends Model {
  static get tableName() {
    return tableNames.vendor;
  }
}

module.exports = vendor;
