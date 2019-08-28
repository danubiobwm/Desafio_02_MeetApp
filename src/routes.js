import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Create Users
routes.post('/users', UserController.store);
// Verification de Users
routes.post('/sessions', SessionController.store);
// Verification Token
routes.use(authMiddlewares);
// Update de Users
routes.put('/update', UserController.update);

// Uploads Files
routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ msg: 'Foi!' });
});

export default routes;
