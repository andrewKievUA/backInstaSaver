const nodemailer = require("nodemailer");
const config = require("config");




async function sendEmail(email,title,message) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: config.get("hostEmail"),
      port: config.get("portEmail"),
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.get("userEmail"), // generated ethereal user
        pass: config.get("passEmail") , // generated ethereal password
      },
    });
  
    let info = await transporter.sendMail({
      from: "insta-@ukr.net", // sender address
      to: email || `andrew1990mk@gmail.com`, // list of receivers
      subject: title, // Subject line
      text: message || "hello", // plain text body
      html: message, // html body
    });
  
 
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  //sendEmail().catch(console.error);


  module.exports = sendEmail