const express = require('express');

const Product = require('./products.model');
const productInfos = require('./product_infos/product_infos.routes');

const router = express.Router({
  mergeParams: true,
});

router.use('/:product_id/product_infos', productInfos);

router.get('/', async (req, res, next) => {
  try {
    const items = await Product.query().where('deleted_at', null);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const items = await Product.query()
      .where('deleted_at', null)
      .andWhere('id', req.params.id)
      // .withGraphJoined('product_infos') // TODO: make this work
      .withGraphFetched('product_infos')
      .first();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // TODO: set user id by logged in user
    const item = await Product.query().insert(req.body);
    res.json(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
