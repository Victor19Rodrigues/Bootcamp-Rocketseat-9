import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';

import validateSessionStore from './app/validators/SessionStore';
import validateStudentStore from './app/validators/StudentStore';
import validatePlanStore from './app/validators/PlanStore';

const routes = new Router();

routes.post('/sessions', validateSessionStore, SessionController.store);
routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.show);
routes.post('/students/:id/help-orders', HelpOrderController.store);

routes.use(authMiddleware);

routes.post('/students', validateStudentStore, StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id/', StudentController.delete);
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);

routes.post('/plans', validatePlanStore, PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id/', PlanController.delete);
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);

routes.post('/registrations', RegistrationController.store);
routes.get('/registrations', RegistrationController.index);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id/', RegistrationController.delete);

routes.get('/help-orders', HelpOrderController.index);
routes.get('/students/:id/help-orders', HelpOrderController.show);

routes.post('/students/help-orders/:id/answer', AnswerController.store);

export default routes;
