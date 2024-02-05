import nodemailer from "nodemailer";


const sendEmail = async function (email, subject, message) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: `Vikas LMS  <${process.env.SMTP_FROM_EMAIL}>`,
    to: email, 
    subject: subject,
    text: message, 
  });
};

export default sendEmail;