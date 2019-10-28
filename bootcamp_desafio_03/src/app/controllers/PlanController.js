import Plan from '../models/Plan';
import User from '../models/User';

class PlanController {
  async index(req, res) {
    const where = {};
    const page = req.query.page || 1;

    const plans = await Plan.findAll({
      where,
      order: ['id'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(plans);
  }

  async store(req, res) {
    const planExists = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (planExists) {
      return res.status(400).json({ error: 'Plan already exists.' });
    }

    const user_id = req.userId;

    const { id, title, duration, price } = await Plan.create({
      ...req.body,
      user_id,
    });

    return res.json({ id, title, duration, price, user_id });
  }

  async update(req, res) {
    const user_id = req.userId;

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const planExists = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (planExists && plan.title !== req.body.title) {
      return res.status(400).json({ error: 'Plan already exists.' });
    }

    if (plan.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const user_id = req.userId;

    const student = await Plan.findByPk(req.params.id);

    if (student.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    await student.destroy();

    return res.status(200).send();
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Plan.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    return res.status(200).json({ student });
  }
}

export default new PlanController();
