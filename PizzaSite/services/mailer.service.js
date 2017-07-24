const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = function() {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: process.env.SMTP_PORT,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
      user: 'rafas.pizzas.webapp@gmail.com',
      pass: 'DreamPizza'
    }
  });

  function sendDeliveredMail(order) {
    var params = {
      from: 'rafas.pizzas.webapp@gmail.com',
      to: order.email,
      subject: 'Your Pizza was delivered!',
      text: 'Your ' + order.pizza.title + ' was delivered'
    };

    transporter.sendMail(params, (error, info) => {

      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }

  return {
    sendDeliveredMail: sendDeliveredMail
  }
};
