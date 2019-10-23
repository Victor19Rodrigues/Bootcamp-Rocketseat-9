import Student from '../models/Student';
import User from '../models/User';

class MeetappController {
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
    const user_id = req.userId;

    const student = await Student.create({
      ...req.body,
      user_id,
    });

    return res.json(student);
  }

  async update(req, res) {
    const user_id = req.userId;

    const student = await Student.findByPk(req.params.id);

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

  // async show(req, res) {
  //   const { id } = req.params;

  //   const meetapp = await Meetapp.findByPk(id, {
  //     include: [
  //       {
  //         model: User,
  //         as: 'user',
  //         attributes: ['id', 'name', 'email'],
  //       },
  //       {
  //         model: File,
  //         as: 'file',
  //         attributes: ['id', 'path', 'url'],
  //       },
  //       {
  //         model: Subscription,
  //         as: 'subscribers',
  //         attributes: ['user_id'],
  //       },
  //     ],
  //   });

  //   if (!meetapp) {
  //     return res.status(400).json({ error: 'Meetapp does not exists' });
  //   }

  //   return res.status(200).json({ meetapp });
  // }
}

export default new MeetappController();
