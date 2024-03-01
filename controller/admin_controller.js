const Users = require('../model/users_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const SECRET = `${process.env.SECRET_KEY}`;

const createToken = (id) => {
  return jwt.sign({ id }, SECRET, { expiresIn: '1d' });
};

const adminSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const HashedPassword = bcrypt.hashSync(password, 12);
    if (!email || !password) {
      res.status(400).json({
        fillTheFields: 'Please fill all the fields !',
      });
    } else {
      const newUser = await Users.create({
        email,
        password: HashedPassword,
      });
      const token = createToken(newUser._id);
      res.status(201).json({ message: 'Sign up !', newUser, token: token });
    }
  } catch (error) {
    res.status(500).json({ problemInCreationAccount: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        fillTheFields: 'Please fill all the fields !',
      });
    } else {
      const existUser = await Users.findOne({ email });
      const matchedPassword = bcrypt.compareSync(password, existUser.password);

      if (matchedPassword) {
        const token = createToken(existUser._id);

        res.status(200).json({ message: 'Login !!', token });
      } else {
        res.json({
          message:
            'user Does not exist or password is incorrect ! Please try check your credential informations! ',
        });
      }
    }
  } catch (error) {
    res.status(500).json({ problemInCreationAccount: error.message });
  }
};

module.exports = { adminSignUp, adminLogin };
