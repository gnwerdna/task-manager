const nodemailer = require("nodemailer");
async function sendWelcomeEmail(email, name) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 25,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  await transporter.sendMail({
    from: 'dangdainguyen.cs@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: `Welcome to the app, ${name}. Let me know how you get along with app.`, // plain text body
    html: `<b>Welcome to the app, ${name}. Let me know how you get along with app.</b>` // html body
  });
};


async function sendCancelledEmail(email, name) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 25,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  await transporter.sendMail({
    from: 'dangdainguyen.cs@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    // text: `Welcome to the app, ${name}. Let me know how you get along with app.`, // plain text body
    html: `<b>We really sorry about that, ${name}. Let us know why you don't like our app. Thank!</b>` // html body
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelledEmail
}
