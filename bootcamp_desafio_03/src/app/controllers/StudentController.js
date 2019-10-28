import Student from '../models/Student';
import User from '../models/User';

class StudentController {
  async index(req, res) {
    const where = {};
    const page = req.query.page || 1;

    const students = await Student.findAll({
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

    return res.json(students);
  }

  async store(req, res) {
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    const user_id = req.userId;

    const { id, name, email, age, weight, height } = await Student.create({
      ...req.body,
      user_id,
    });

    return res.json({ id, name, email, age, weight, height, user_id });
  }

  async update(req, res) {
    const user_id = req.userId;

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists && student.email !== req.body.email) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    if (student.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    await student.update(req.body);

    return res.json(student);
  }

  async delete(req, res) {
    const user_id = req.userId;

    const student = await Student.findByPk(req.params.id);

    if (student.user_id !== user_id) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    await student.destroy();

    return res.status(200).send();
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id, {
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

export default new StudentController();
