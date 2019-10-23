import { Router } from 'express';

import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

import validateSessionStore from './app/validators/SessionStore';
import StudentController from './app/controllers/StudentController';

const routes = new Router();

routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id/', StudentController.delete);
routes.get('/students', StudentController.index);

export default routes;
