import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';

import authMiddleware from './app/middlewares/auth';

import validateSessionStore from './app/validators/SessionStore';
import validateStudentStore from './app/validators/StudentStore';
import validatePlanStore from './app/validators/PlanStore';

const routes = new Router();

routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/students', validateStudentStore, StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id/', StudentController.delete);
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);

routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
// routes.delete('/plans/:id/', PlanController.delete);
routes.get('/plans', PlanController.index);
// routes.get('/plans/:id', PlanController.show);

export default routes;
