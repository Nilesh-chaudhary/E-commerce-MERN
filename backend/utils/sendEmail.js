const nodemailer = require("nodemailer")

const sendEmail = async (options) =>{

    const transporter = nodemailer.createTransport({
        service : process.env.SMPT_SERVICE,
        auth : {
            user : process.env.SMPT_MAIL,
            pass : process.env.SMPT_PASSWORD,
        }
    })

    const mailOptions = {
        from : "",
        to : options.email,
        subject : options.subject,
        text : options.message
    }

    await transporter.sendMail(mailOptions)

}

module.exports = sendEmail;