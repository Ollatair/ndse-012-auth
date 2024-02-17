const User = require('../models/user');

 
module.exports.serializeUser = (user, cb) => {
    cb(null, user)
  }
 
 
module.exports.deserializeUser = (user, cb) => {
    User.findById(user.id,  (err, user) => {
      if (err) { return cb(err) }
      cb(null, user)
    })
  }
 
 
module.exports.verifyUser = async (username, password, done) => {
    await User.findOne({ 'username': username })
    .then((user) => {
        if (!user) {return done(null, false) }
        if( user.password === password) { 
            return done(null, user)
        } 
        return done(null, false)
    })
    .catch((e) => { 
        return done(e)
    });
 
  };
 
module.exports.userLogin =   (req, res) => {
    console.log("req.user: ", req.user)
    res.redirect('/')
  }
 
  module.exports.userLogout = (req, res) => {
    req.logout(function(err) {
        if (err) { 
            console.log(err);
            return res.redirect('/404');
        }
        res.redirect('/');
    });
}


module.exports.renderProfile =  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/user/login')
    }
    res.render('user/profile', {  title: 'Профиль', user: req.user })
 
  };



module.exports.renderLogin = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    res.render('user/login', {  title: 'Вход'})
  };


module.exports.renderRegister = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    res.render('user/register', {  title: 'Регистрация'})
  };


module.exports.userRegister = async (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    const {
        displayName, username, password
      } = req.body;
    try {
        
          const existingUser = await User.findOne({ username: username });
          if (!existingUser) {
            await User.create({
                displayName, username, password
              });
            console.log(`Пользователь "${username}" спешно добавлена в базу данных`);
            return res.redirect('/user/login')
          } else {
            console.log(`Пользователь "${username}" уже существует в базе данных`);
            res.render('user/register', {  title: 'Регистрация'})
          }
    
      } catch (error) {
        console.error('Ошибка при добавлении пользователя:', error);
      }
};
 