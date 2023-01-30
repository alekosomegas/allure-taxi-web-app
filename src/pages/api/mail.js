// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Nodemailer from 'nodemailer'

export default function handler(req, res) {
  const transporter = Nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ea21b0ad5b8c5d",
      pass: "3070ba56795844"
    }
  });

  const mailOptions = {
    from: '"Allure Taxi" <allure-taxi"allure.com>',
    to: 'kangkelidis@gmail.com',
    subject: 'Booking',
    text: req.body,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log(info);
  })

  res.status(200).json({ status: 'ok' })
}

