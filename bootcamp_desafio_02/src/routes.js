import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

import validateSessionStore from './app/validators/SessionStore';
import validateStudentStore from './app/validators/StudentStore';

const routes = new Router();

routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/students', validateStudentStore, StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id/', StudentController.delete);
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
export default routes;
