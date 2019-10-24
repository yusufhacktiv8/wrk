const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models');
require('dotenv').config();

const sendLoginFailedMessage = function (req, res) {
  res.send('Invalid username or password or role', 403);
};

const EXPIRES_IN = 60 * 60 * 10;

exports.signIn = function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  models.User.findOne({
    where: { username },
    include: [
      {
        model: models.Role,
      },
    ],
  })
  .then((user) => {
    if (user !== null) {
      bcrypt.compare(password, user.password, (err, bcryptResult) => {
        if (bcryptResult) {
          if (user.Role.code === 'ADMIN') {
            const token = jwt.sign({
              userId: user.id,
              name: user.name,
              role: user.Role.code,
            }, process.env.TOKEN_PASSWORD, { expiresIn: EXPIRES_IN });
            res.json({
              token,
            });
          } else {
            models.ProjectUser.findOne({
              where: {},
              include: [
                {
                  model: models.User,
                  where: { username }
                },
                {
                  model: models.Project,
                }
              ],
            })
            .then((projectUser) => {
              if (projectUser != null) {
                const token = jwt.sign({
                  userId: user.id,
                  name: user.name,
                  role: user.Role.code,
                  project: projectUser.Project.code
                }, process.env.TOKEN_PASSWORD, { expiresIn: EXPIRES_IN });
                res.json({
                  token,
                });
              } else {
                sendLoginFailedMessage(req, res);
              }
            });
          }
        } else {
          sendLoginFailedMessage(req, res);
        }
      });
    } else {
      sendLoginFailedMessage(req, res);
    }
  });
};
