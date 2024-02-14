const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const user = process.env.USER;
const pass = process.env.PASS;

let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: user,
    pass: pass
  }
});

fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, html) => {
  if (err) {
    console.error('Error Loading HTML file: ', err);
    return;
  }

  const name = 'TEST PERSON';
  html = html.replace('{{ NAME }}', name);
  let mailOptions = {
    from: 'gmail.com',
    to: 'gmail.com',
    subject: 'TPG TEST EMAIL',
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error Occured: ', error);
    } else {
      console.log('Email Sent Successfully!');
      consol.log('Message ID: ', info.messageId);
    }
  });
});


