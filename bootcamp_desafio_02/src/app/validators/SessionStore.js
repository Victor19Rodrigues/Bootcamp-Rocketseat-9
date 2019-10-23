import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required('Email is a required field'),
      password: Yup.string()
        .required('Password is a required field')
        .min(6, 'Password must be at least 6 characters'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
