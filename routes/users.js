const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { Mongoose } = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
  '/',
  [
    // use .notEmpty
    check('name', 'name is required').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check(
      'password',
      'Please enter a valid password. Min 6 characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // change user variable name for a more representative
      let user = await User.findOne({ email });
      // console.log(user)

      if (user) {
        return res.status(400).json({ msg: 'User already on the DB' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
