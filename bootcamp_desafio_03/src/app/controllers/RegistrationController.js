import { parseISO, addMonths, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Queue from '../../lib/Queue';

import RegistrationMail from '../jobs/RegistrationMail';

import Plan from '../models/Plan';
import Registration from '../models/Registration';
import Student from '../models/Student';

class RegistrationController {
  async store(req, res) {
    const user_id = req.userId;
    const { student_id, plan_id, start_date } = req.body;

    const registrationExists = await Registration.findOne({
      where: { student_id },
    });

    if (registrationExists) {
      return res
        .status(400)
        .json({ error: 'This student already have a plan.' });
    }

    const planExists = await Plan.findByPk(plan_id);

    if (!planExists) {
      return res.status(400).json({ error: 'Plan does not exists.' });
    }

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    const { name, email } = studentExists;

    const { title, price, duration } = planExists;

    const endDate = addMonths(parseISO(start_date), duration);
    const finalPrice = price * duration;

    const registration = await Registration.create({
      user_id,
      student_id,
      plan_id,
      start_date: parseISO(start_date),
      end_date: endDate,
      price: finalPrice,
    });

    const dateFinished = format(endDate, 'dd/MM/yyyy', {
      locale: pt,
    });

    const emailInformations = {
      name,
      email,
      title,
      date: dateFinished,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(finalPrice),
    };

    await Queue.add(RegistrationMail.key, {
      emailInformations,
    });

    return res.json(registration);
  }
}

export default new RegistrationController();
