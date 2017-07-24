
const DBHelper = require('../lib/db-helper')();

module.exports = function LoginController() {

    function login(req, res) {
        res.render('login');
    }

    function signup(req, res) {
      res.render('signup');
    }

    function authenticate(req, res) {
        var user = {
            email: req.body.email,
            password: req.body.password
        };

        DBHelper.getUser(user, function(err, data) {
            if (err) {
                res.json({
                    message: 'Database conection error.',
                    error: err
                });
            } else {
                if (!data) {
                    res.json({
                        success: 'failed',
                        errorMessage: 'User not found.'
                    });
                } else if (user.password == data.password) {

                } else {
                    res.json({
                        success: 'failed'
                    })
                }
            }
        });
        // res.redirect('/');
    }

    return {
        login: login,
        authenticate: authenticate,
        signup: signup
    }
};
