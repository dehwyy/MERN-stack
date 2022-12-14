import nodemailer from "nodemailer"
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'talon80@ethereal.email',
        pass: 'Gf7meZCNu1UYPZTf3g'
      }
    });
  }
  async sendMessage(to, link) {
    await this.transporter.sendMail({
      from: "test",
      to,
      subject: "account confirm",
      text: 'aloha',
      html: `<div><h1>ACCOUNT CONFIRMATION</h1><a href=${link}>CLICK HERE TO ACTIVATE YOUR ACC</a></div>`
    })
  }
}

export default new MailService()