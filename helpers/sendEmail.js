const sgMail = require('@sendgrid/mail');

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async ({to, subject, html}) => {
  const email = {to, subject, html, from: 'nicklemster@gmail.com'};

  await sgMail.send(email)
    .then(() => console.log('Email sent success'));
  return true;
};

module.exports = sendEmail;

// const email = {
//   to: 'tr@mail.com',
//   from: 'nicklemster@gmail.com',
//   subject: 'New site request',
//   html: '<p>New site request came.</p>',
// };
//
// sgMail.send(email)
//   .then(() => console.log('Email send success'))
//   .catch(e => console.log(e.message));