import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('Name is a required field.'),
      email: Yup.string()
        .email()
        .required('Email is a required field.'),
      age: Yup.number()
        .typeError('Age must be a number value.')
        .integer('Age must be a integer value.'),
      weight: Yup.number().typeError('Weight must be a number value.'),
      height: Yup.number().typeError('Height must be a number value.'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
