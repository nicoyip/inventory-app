const express = require('express');

const ProductInfo = require('./product_infos.model');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
  try {
    const products = await ProductInfo.query().where('deleted_at', null);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // TODO: set user id by logged in user
    req.body.product_id = Number(req.params.product_id);
    const item = await ProductInfo.query().insert(req.body);
    res.json(item);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const item = await ProductInfo.query().patchAndFetchById(
      req.params.id,
      req.body
    );
    res.json(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
