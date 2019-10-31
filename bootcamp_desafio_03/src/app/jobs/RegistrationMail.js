import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { name, email, title, date, price } = data.emailInformations;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Informações de Matrícula',
      template: 'registration',
      context: {
        title,
        name,
        date,
        price,
      },
    });
  }
}

export default new RegistrationMail();
