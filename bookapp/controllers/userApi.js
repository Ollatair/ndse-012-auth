const User = require('../models/user');

// userLogin
module.exports.userLogin = (req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((e) => {
      console.log(e);
    });
};

// userRegister
module.exports.userRegister = async (req, res) => {
  const {
    displayName, username, password,
  } = req.body;
  if (!username || !password) {
    return res.status(400).json('Отсутствуют обязательные поля');
  }
  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      const newUser = await User.create({
        displayName, username, password,
      });
      return res.status(201).json(newUser);
    }
    return res.status(409).json(`Пользователь "${username}" уже существует в базе данных`);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Ошибка при добавлении пользователя');
  }
};

// userProfile
module.exports.userProfile = (req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((e) => {
      console.log(e);
    });
};

// получить пользователя по **ID**
module.exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).orFail();
    res.json(book);
  } catch (error) {
    if (error.name === 'DocumentNotFoundError') {
      res.status(404).json('404 | книга не найдена');
    } else {
      res.status(500).json(error.message);
    }
  }
};
