(function() {
  'use strict';

  document.addEventListener("DOMContentLoaded", function(event) {

    function LoginController() {
      var loginForm = document.getElementById('login-form');
      var email = document.getElementById('email');
      var password = document.getElementById('password');

      loginForm.onsubmit = onLogin;

      function onLogin(evt) {
        evt.preventDefault();
        var user = {
          email: email.value,
          password: password.value
        };

        Ajax.post('/api/authenticate', user, function(response) {
          if (response.success == "success") {
            var user = response.user;

            localStorage.setItem('userId', user._id);
            localStorage.setItem('name', user.name);
            localStorage.setItem('email', user.email);
            localStorage.setItem('authorization', user.authorization);
            window.location.assign('');
          } else {
            Ajax.removeAuthrization();
            return false;
          }
        });
      }
    }
    LoginController();
  });
})();
