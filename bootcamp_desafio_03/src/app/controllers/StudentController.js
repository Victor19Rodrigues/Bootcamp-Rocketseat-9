import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll({
      order: ['id'],
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

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({ id, name, email, age, weight, height });
  }

  async update(req, res) {
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

    await student.update(req.body);

    return res.json(student);
  }

  async delete(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    await student.destroy();

    return res.status(200).json({ message: 'Student deleted.' });
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    return res.status(200).json({ student });
  }
}

export default new StudentController();
