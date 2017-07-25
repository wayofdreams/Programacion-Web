const DBHelper = require('../lib/db-helper')();
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

module.exports = function APIController() {

    function _handleDbHelperResponse(res, err, data) {
        if (err) {
            res.json({
                message: 'Ups, Something happened!',
                error: err
            });
        } else {
            res.json(data);
        }
    }

    function authenticate(req, res) {
        // var auth = req.get('Authorization');
        var user = {
          email: req.body.email,
          password: req.body.password
        }

        DBHelper.getUser(user, function(err, data) {
            if (err) {
                res.json({
                    message: 'Ups, Something happened!',
                    error: err
                });
            } else {
                if (!data) {
                    res.json({
                        failed: 'failed',
                        errorMessage: 'User was not found!'
                    });
                } else {
                    bcrypt.compare(user.password, data.password, function(err, result) {
                        if (err) {
                            res.json({
                                failed: 'failed',
                                errorMessage: 'Wrong user or password!'
                            });
                        } else {
                            var token = token = data.email + ':' + data.password;
                            var hash = new Buffer(token).toString('base64');

                            res.json({
                                user: {
                                  name: data.name,
                                  email: data.email,
                                  _id: data._id,
                                  authorization: hash
                                },
                                success: 'success'
                            });
                        }
                    });
                }
            }
        });
    }

    function signUp(req, res) {
        console.log(req.body);
        var password = req.body.password;

        bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
            var user = {
                name: req.body.name,
                email: req.body.email,
                password: hash,
            };

            DBHelper.addUser(user, function(err, data) {
                _handleDbHelperResponse(res, err, data);
            });
        });
    }

    function getUsers(req, res) {
        DBHelper.getUsers({}, function(err, data) {
            _handleDbHelperResponse(res, err, data);
        });
    }

    function getUserEmail(auth) {
      if (auth) {
          auth = auth.split(' ');
          if (auth[1]) {
              var hash = auth[1];
              var tokens = new Buffer(hash, 'base64').toString('ascii').split(':');
              var user = {
                  email: tokens[0],
                  password: tokens[1],
              };
              return user.email;
          }
      }
    }

    function getUserByEmail(email, callback) {
      DBHelper.getUser({email: email}, function(err, data) {
        callback(err, data);
      });
    }

    function isUserAuthenticated(auth) {
        if (auth) {
            auth = auth.split(' ');
            if (auth[1]) {
                var hash = auth[1];
                var tokens = new Buffer(hash, 'base64').toString('ascii').split(':');
                var user = {
                    email: tokens[0],
                    password: tokens[1],
                };

                if (user.email) {
                    return true;
                }
            }
        }
        return false;
    }

    return {
        signUp: signUp,
        authenticate: authenticate,
        getUsers: getUsers,
        isUserAuthenticated: isUserAuthenticated,
        getUserEmail: getUserEmail
    }
};
