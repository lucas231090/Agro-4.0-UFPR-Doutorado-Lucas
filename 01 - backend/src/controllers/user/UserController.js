// métodos dos controllers:

/*

//index: listar sessões

store: Criar uma sessão

show: listar uma unica sessão

update: atualizar alguma sessão

destroy: deletar alguma sessão

*/

// const { update } = require('../../models/User');
const yup = require('yup');
const User = require('../../models/User');

module.exports = {
  async index(request, response) {
    const users = await User.find();

    return response.status(200).json(users);
  },

  async store(request, response) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(6),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(401).json({ error: 'Falha na validação' });
    }

    const { password, email, name } = request.body;

    // verificando se esse usuario ja existe

    let user = await User.findOne({ email });

    // se n existe ele cria um novo

    if (!user) {
      user = await User.create({
        name,
        email,
        password,
      });
    } else
      response.status(400).send({ error: 'Este e-mail já está cadastrado' });

    user.password = undefined;

    return response.status(200).json({ user });
  },

  /*

  CADASTRO PORÉM ELE N RETORNA STATUS 400 QUANDO O USUARIO JÁ EXISTE...
  async store(request, response) {
    const userExist = await User.findOne({
      where: { email: request.body.email },
    });

    if (userExist) {
      return response.status(400).json({ error: 'Usuário já existe' });
    }

    const { name, email, password } = await User.create(request.body);

    return response.json({ name, email, password });
  },
  */

  /*
  async update(request, response) {
    // console.log(request.userId);

    const { email, oldPassword } = request.body;

    const userUpdate = await User.findOne(request.body);

    if (email !== userUpdate.email) {
      const user = await User.findOne({ where: { email } });

      if (userUpdate) {
        response.status(400).send({ error: 'Este e-mail já está cadastrado' });
      }
    }

    if (oldPassword && !(await userUpdate.checkPassword(oldPassword))) {
      return response.status(401).json({ error: 'Senha incorreta' });
    }

    const { _id, name } = await userUpdate.update(request.body);

    return response.json({ _id, name, email });
  },
  */
};
