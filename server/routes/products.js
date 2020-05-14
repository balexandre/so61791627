// PRODUCTS ROUTE FILE
// ============================================================
const router = require('express').Router();
const util = require('../utilities');
const db = require('../models');

// lists all products
// GET /products
// GET /products?limit=2&page=2
// ============================================================
const listAllProducts = async (req, res) => {
  const page = util.parser.tryParseInt(req.query.page, 0);
  const limit = util.parser.tryParseInt(req.query.limit, 10);

  try {
    const result = await db.products.findAndCountAll({
      where: {
        active: '1',
      },
      offset: limit * page,
      limit,
      order: [['id', 'ASC']],
    });

    res.json(util.response.paging(result, page, limit));
  } catch (err) {
    res.json({ error: err.message });
  }
};

router.get('/products', listAllProducts);

module.exports = router;
