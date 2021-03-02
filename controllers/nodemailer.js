const nodemailer = require ('nodemailer')

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  })

exports.sendEmailProcess = async(req, res) => {
    const { subject, email, message } = req.body
    //Send email
    await transporter.sendMail({
      from: ' BookswApp <bookswap.ironhack@gmail.com>',
      to: email, 
      subject, 
      text: `Plain text message`,
    //   html: `<p>HTML text ${message}</p>`
    })
    .then(info => console.log(info))
    .catch(error => console.log(error))
    
    res.json({message: 'Email sent'})
  }