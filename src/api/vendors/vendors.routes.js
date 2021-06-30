const express = require('express');

const vendor = require('./vendors.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const companies = await vendor.query().where('deleted_at', null);
    res.json(companies);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
