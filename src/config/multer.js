const multer = require('multer');
const { extname, resolve } = require('path');
const crypto = require('crypto');

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        const name = res.toString('hex') + extname(file.originalname);
        req.extension = extname(file.originalname);

        return cb(null, name);
      });
    },
  }),
};
