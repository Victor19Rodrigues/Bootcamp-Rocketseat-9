import { parseISO, addMonths, format, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Queue from '../../lib/Queue';

import RegistrationMail from '../jobs/RegistrationMail';

import Plan from '../models/Plan';
import Registration from '../models/Registration';
import Student from '../models/Student';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
    });

    return res.json(registrations);
  }

  async store(req, res) {
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

    if (isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({ error: 'Invalid start date' });
    }

    const { name, email } = studentExists;

    const { title, price, duration } = planExists;

    const endDate = addMonths(parseISO(start_date), duration);
    const finalPrice = price * duration;

    const registration = await Registration.create({
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

  async update(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    const registration = await Registration.findByPk(req.params.id);

    const planExists = await Plan.findOne({
      where: { id: plan_id },
    });

    if (!planExists) {
      return res.status(400).json({ error: 'Plan does not exists.' });
    }

    const studentExists = await Student.findOne({
      where: { id: student_id },
    });

    if (!studentExists) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    if (isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({ error: 'Invalid start date' });
    }

    const { price, duration } = planExists;

    const endDate = addMonths(parseISO(start_date), duration);
    const finalPrice = price * duration;

    await registration.update({
      student_id,
      plan_id,
      start_date: parseISO(start_date),
      end_date: endDate,
      price: finalPrice,
    });

    return res.json(registration);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);

    if (!registration) return res.status(400).json({ error: 'Invalid id.' });

    await Registration.destroy({ where: { id: req.params.id } });

    return res.json({ message: 'Registration sucessfully removed.' });
  }
}

export default new RegistrationController();
