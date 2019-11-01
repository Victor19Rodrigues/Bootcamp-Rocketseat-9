import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const page = req.query.page || 1;

    const plans = await Plan.findAll({
      order: [['title', 'DESC']],
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

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async update(req, res) {
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

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    await plan.destroy();

    return res.status(200).json({ message: 'Plan deleted!' });
  }

  async show(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    return res.status(200).json({ plan });
  }
}

export default new PlanController();
