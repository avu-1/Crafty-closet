// backend/middleware/firebaseUpload.js
// ─────────────────────────────────────────────────────────────────────
// Takes the in-memory buffer from multer (req.file.buffer) and uploads
// it to Firebase Storage. Attaches the public URL to req.firebaseImageUrl.
// ─────────────────────────────────────────────────────────────────────
const admin = require('../config/firebase');
const path  = require('path');

/**
 * Middleware: upload req.file buffer to Firebase Storage.
 * Must be placed AFTER multer middleware in the route chain.
 */
const firebaseUpload = async (req, _res, next) => {
  try {
    // If no file was uploaded, skip — this allows optional image updates
    if (!req.file) return next();

    const bucket = admin.storage().bucket();
    const ext    = path.extname(req.file.originalname).toLowerCase() || '.jpg';
    const name   = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const dest   = `products/${name}`;

    const file = bucket.file(dest);

    // Upload buffer to Firebase Storage
    await file.save(req.file.buffer, {
      metadata: {
        contentType: req.file.mimetype,
        cacheControl: 'public, max-age=31536000',
      },
    });

    // Make publicly readable
    await file.makePublic();

    // Build the public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${dest}`;
    req.firebaseImageUrl = publicUrl;

    next();
  } catch (err) {
    console.error('❌ Firebase Storage upload failed:', err.message);
    next(err);
  }
};

module.exports = firebaseUpload;
