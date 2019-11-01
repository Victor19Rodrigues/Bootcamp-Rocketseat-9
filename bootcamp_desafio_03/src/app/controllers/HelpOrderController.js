import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        answer_at: null,
      },
    });

    return res.json(helpOrders);
  }

  async show(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) return res.status(400).json("This student doesn't exist");

    const helpOrders = await HelpOrder.findAll({
      where: { student_id: req.params.id },
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const { question } = req.body;

    const student = await Student.findByPk(req.params.id);

    if (!student) return res.status(400).json("This student doesn't exist");

    const helpOrder = await HelpOrder.create({
      student_id: req.params.id,
      question,
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
