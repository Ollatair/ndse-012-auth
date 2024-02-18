const express = require('express');

const router = express.Router();

const {
  userLogin,
  userRegister,
  userProfile,
} = require('../../controllers/userApi');

router.get('/me', userProfile);
router.post('/login', userLogin);
router.post('/signup', userRegister);

module.exports = router;
