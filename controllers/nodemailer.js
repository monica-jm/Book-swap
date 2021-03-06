// const nodemailer = require ('nodemailer')

// const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: req.user.email,
//       pass: req.user.password
//     }
//   })

// exports.sendEmailProcess = async(req, res) => {
//     const { username, email, message } = req.body
//     const { senderUsername, senderEmail, senderMessage } = req.user

//     const message = `Hello ${username}, I would like to swap a book with you, lets set a meeting point`

//     //Send email
//     await transporter.sendMail({
//       from: 'Swapper <req.user.email>',
//       to: email, 
//       subject: Swapping-request, 
//       text: `Plain text message`,
//     //   html: `<p>HTML text ${message}</p>`
//     })
//     .then(info => console.log(info))
//     .catch(error => console.log(error))
    
//     res.json({message: 'Email sent'})
//   }