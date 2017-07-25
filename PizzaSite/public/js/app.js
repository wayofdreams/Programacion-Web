(function() {
  'use strict';

  document.addEventListener("DOMContentLoaded", function(event) {

    var loginLink = document.getElementById('login-link');
    var helloMessage = document.getElementById('hello-message');
    var btnLogout = document.getElementById('btn-logout');

    btnLogout.onclick = logout;

    if(isUserLogged()) {
      loginLink.className = "hide";
      helloMessage.classList.remove("hide");
    } else {
      loginLink.classList.remove("hide");
      helloMessage.className = "hide";
    }

    function logout(evt){
      evt.preventDefault();
      localStorage.removeItem('authorization');
      localStorage.removeItem('email');
      localStorage.removeItem('userId');
      localStorage.removeItem('name');

      loginLink.classList.remove("hide");
      helloMessage.className = "hide";
      location.assign('pizza');
    }

    function isUserLogged(){
      var user = localStorage.getItem('authorization');
      return user;
    }
  });
})();
