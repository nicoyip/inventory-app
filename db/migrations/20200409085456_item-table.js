const {
  addDefaultColumns,
  url,
  references,
} = require('../../src/lib/tableUtils');
const tableNames = require('../../src/constants/tableNames');

/**
 * @param {import('knex')} knex
 */
exports.up = async (knex) => {
  await knex.schema.table(tableNames.state, (table) => {
    table.string('code');
    references(table, tableNames.country);
  });

  await knex.schema.table(tableNames.country, (table) => {
    table.string('code');
  });

  await knex.schema.createTable(tableNames.size, (table) => {
    table.increments();
    table.string('name').notNullable();
    table.float('length');
    table.float('width');
    table.float('height');
    table.float('volume');
    references(table, tableNames.shape);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.product, (table) => {
    table.increments();
    references(table, tableNames.user);
    table.string('name');
    references(table, tableNames.product_type);
    table.text('description');
    references(table, tableNames.vendor);
    references(table, tableNames.size, false);
    table.string('sku', 42);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.product_info, (table) => {
    table.increments();
    references(table, tableNames.user);
    references(table, tableNames.product);
    table.dateTime('purchase_date').notNullable();
    table.dateTime('expiration_date');
    references(table, tableNames.vendor, false, 'retailer');
    table.dateTime('last_used');
    table.float('purchase_price').notNullable().defaultTo(0);
    table.float('msrp').notNullable().defaultTo(0);
    references(table, tableNames.inventory_location);
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.product_image, (table) => {
    table.increments();
    references(table, tableNames.product);
    url(table, 'image_url');
    addDefaultColumns(table);
  });

  await knex.schema.createTable(tableNames.related_product, (table) => {
    table.increments();
    references(table, tableNames.product);
    references(table, tableNames.product, false, 'related_product');
    addDefaultColumns(table);
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.table(tableNames.state, (table) => {
    table.dropColumn('code');
    table.dropColumn('country_id');
  });

  await knex.schema.table(tableNames.country, (table) => {
    table.dropColumn('code');
  });

  await Promise.all(
    [
      tableNames.size,
      tableNames.product,
      tableNames.product_info,
      tableNames.product_image,
      tableNames.related_product,
    ]
      .reverse()
      .map((name) => knex.schema.dropTableIfExists(name))
  );
};
