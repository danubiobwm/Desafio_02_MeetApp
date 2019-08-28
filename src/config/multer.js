import multer from 'multer';
import crypton from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypton.randomBytes(16, (err, raw) => {
        if (err) return cb(err);

        return cb(null, raw.toString('hex') + extname(file.originalname));
      });
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowenMines = ['image/jpg', 'image/pjpeg', 'image/png'];

    if (allowenMines.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo inválido '));
    }
  },
};
