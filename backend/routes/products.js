// backend/routes/products.js
const router   = require('express').Router();
const ctrl     = require('../controllers/productController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const validate = require('../middleware/validate');
const upload   = require('../middleware/upload');
const v        = require('../validators');

// Public — no auth needed
router.get('/',           ctrl.getProducts);   // productQuery is [] so no validation runs
router.get('/categories', ctrl.getCategories);
router.get('/:id',        ctrl.getProduct);

// Authenticated users
router.post('/:id/rate', authenticate, v.rateProduct, validate, ctrl.rateProduct);

// Admin only
router.post('/',
  authenticate, requireAdmin, upload.single('image'),
  v.createProduct, validate,
  ctrl.createProduct
);
router.put('/:id',
  authenticate, requireAdmin, upload.single('image'),
  v.updateProduct, validate,
  ctrl.updateProduct
);
router.delete('/:id',
  authenticate, requireAdmin,
  ctrl.deleteProduct
);

module.exports = router;
