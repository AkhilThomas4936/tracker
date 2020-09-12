const nodemailer = require("nodemailer");

function mail(teamMembers) {
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "akhlthmz@gmail.com",
      pass: "xdr5^7ygv",
    },
    tls: {
      rejeectUnauthorized: false,
    },
  });

  let info = {
    from: '"Tracker" <akhlthmz@gmail.com>',
    to: teamMembers,
    subject: "From node.js",
    text: "Test message from tracker",
    html: "",
  };

  smtpTransport.sendMail(info, (err, info) => {
    if (err) {
      console.log(err);
    }
    console.log("Message sent");
  });
}

module.exports = mail;
