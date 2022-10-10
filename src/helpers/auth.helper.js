const AccountModel = require('../app/models/account.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const authHelper = {
  hashedPassword: (password) => {
    // using bcrypt npm to hash password
    const salt = bcrypt.genSaltSync(Number.parseInt(process.env.SALT));
    const hashed = bcrypt.hashSync(password, salt);
    return hashed;
  },

  createNewUser: (user, hashed) => {
    const newAccount = new ({
      username: user.username,
      email: user.email,
      password: hashed,
    });
    return newUser;
  },

  register: (req, res) => {
    const hashed = authHelper.hashedPassword(req.body.password);
    let newUser = authHelper.createNewUser(req.body, hashed);
    newUser.save()
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(err => {
      return res.status(500).json({"detail": "Can not register", "error": err.message});
    })
  },

  checkUsername: async (username) => {
    const user = await AccountModel.findOne({username: username}).populate("roleId");
    if (!user) {
      return false;
    }
    return user;
  },

  checkPassword: (password1, password2) => {
    const invalidPassword = bcrypt.compareSync(password1, password2);
    if(!invalidPassword) {
      return false;
    }

    return invalidPassword;
  },

  createToken: (payload) => {
    return jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '20m' }
    );
  },

  createRefreshToken: (payload) => {
    return jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: '10d'}
    );
  },

  login: async (req, res) => {
    let user = await authHelper.checkUsername(req.body.username);
    let invalidPassword = false;
    if(user) {
      invalidPassword = authHelper.checkPassword(req.body.password, user.password);
    }

    if(!user || !invalidPassword) {
      return false;
    }

    if (user && invalidPassword) {
      const payload = {...user};
      const token = authHelper.createToken(payload);
      const refreshToken = authHelper.createRefreshToken(payload);

      let {password, ...other} = user._doc;
      const res_data = {...other, token, refreshToken};
      return res_data;
    }
  },

  verifyToken: (token) => {
    const res = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if(err) {
        return [false, null];
      }
      else {
        return [true, user];
      }
    });
    return res;
  },

  verifyRefreshToken: (refreshToken) => {
    const res = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if(err) {
        return [false, null];
      }
      else {
        return [true, user];
      }
    });
    return res;
  },
}

module.exports = authHelper;
