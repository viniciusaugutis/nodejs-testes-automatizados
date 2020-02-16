const { User } = require('../models');
const Mail = require('../services/MailService');
class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Incorret password' });
    }

    await Mail.send({
      from: 'Vinícius Augutis <vinicius_augutis@hotmail.com>',
      to: `${user.name} <${user.email}>`,
      subject: 'Novo acesso em sua conta',
      text: 'Foi registrado um novo acesso em sua conta',
    });

    return res.json({
      token: await user.generateToken(),
    });
  }
}
module.exports = new SessionController();
