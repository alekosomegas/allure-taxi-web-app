// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import Nodemailer from 'nodemailer'

// export default function handler(req, res) {
//   const transporter = Nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "ea21b0ad5b8c5d",
//       pass: "3070ba56795844"
//     }
//   });

//   const mailOptions = {
//     from: '"Allure Taxi" <allure-taxi"allure.com>',
//     to: 'kangkelidis@gmail.com',
//     subject: 'Booking',
//     text: req.body
//   }

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return console.error(error);
//     }
//     console.log(info);
//   })
//   res.status(200).json({ status: 'ok' })



// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'kangkelidis@gmail.com', // Change to your recipient
//   from: 'kangkelidis@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
// }
