(function() {
    'use strict';

    document.addEventListener("DOMContentLoaded", function(event) {
        var signupForm = document.getElementById('signup-form');
        var nameField = document.getElementById('name');
        var emailField = document.getElementById('email');
        var passwordField = document.getElementById('password');
        var repasswordField = document.getElementById('re-password');

        signupForm.onsubmit = onSubmitForm;

        function onSubmitForm(event) {
            event.preventDefault();

            if (passwordField.value != repasswordField.value) {
                console.log('Passwords do not match!');
                return false;
            }

            var newUser = {
                name: nameField.value,
                email: emailField.value,
                password: passwordField.value,
            };


            Ajax.post('/api/signup', newUser, function(response) {
                if (response.success == "success") {
                    var user = response.user;

                    localStorage.setItem('userId', user._id);
                    localStorage.setItem('name', user.name);
                    localStorage.setItem('email', user.email);
                    localStorage.setItem('authorization', user.authorization);

                    window.location.assign('');
                } else {

                    return false;
                }
            });

            return false;
        }
    });
})();
