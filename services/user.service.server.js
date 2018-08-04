const userModel = require('../models/user/user.model.server');

module.exports = app => {
  const findAllUsers = (req, res) => {
    userModel.findAllUsers()
      .then(users => res.send(users));
  };

  const createUser = (req, res) => {
    const user = req.body;
    userModel.createUser(user)
      .then(newUser => {
        req.session['currentUser'] = newUser;
        res.send(newUser)
      });
  };

  const login = (req, res) => {
    const user = req.body;
    userModel.findUserByCredentials(user.username, user.password)
      .then(user => {
        req.session['currentUser'] = user;
        res.send(req.session['currentUser']);
      })
  };

  const logout = (req, res) => {
    req.session['currentUser'] = undefined;
    res.sendStatus(200);
  };

  const deleteUser = (req, res) => {
    const currentUser = req.session['currentUser'];
    if (currentUser) {
      userModel.deleteUserById(currentUser._id)
        .then(res.sendStatus(200));
    } else {
      res.sendStatus(403);
    }
  };

  const getProfile = (req, res) => {
    const currentUser = req.session['currentUser'];
    if (currentUser) {
      userModel.findUserByIdExpanded(currentUser._id)
        .then(user => res.send(user));
    } else {
      res.sendStatus(403);
    }
  };

  const updateProfile = (req, res) => {
    const currentUser = req.session['currentUser'];
    const newUser = req.body;
    if (currentUser && currentUser._id === newUser._id) {
      userModel.updateUser(newUser)
        .then(updated => res.send(updated));
    } else {
      res.sendStatus(403);
    }
  };

  app.get('/api/user', findAllUsers);
  app.post('/api/register', createUser);
  app.post('/api/login', login);
  app.post('/api/logout', logout);
  app.delete('/api/profile', deleteUser);
  app.get('/api/profile', getProfile);
  app.put('/api/profile', updateProfile);
};