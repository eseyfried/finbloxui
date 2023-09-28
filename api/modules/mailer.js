const nodemailer = require("nodemailer");
const neh = require("nodemailer-express-handlebars");
const path = require('path');
const { config } = require(__dirname + '/config/config.js')


const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./mail/'),
        defaultLayout: false,
        // helpers: {
        //   currency: (v) => { return formatCurrency(v/100); }
        // }
    },
    viewPath: path.resolve('./mail/'),
};


module.exports = async function mailer() {
    let transporter = nodemailer.createTransport({
        host: config.smtp_mail_host,
        port: config.smtp_mail_port,
        secure: config.env === "development" ? false : true, // upgrade later with STARTTLS
        auth: {
            user: config.smtp_mail_user,
            pass: config.smtp_mail_pass
        },
    });

    transporter.use('compile', neh(handlebarOptions))

    return transporter
}
