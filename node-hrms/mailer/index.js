const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: process.env.AWS_SMTP,
    port: 587,
    auth: {
        user: process.env.AWS_SMTP_UN,
        pass: process.env.AWS_SMTP_PS,
    },
});

// const mailOptions = {
//     from: 'lucky.kshp@gmail.com',
//     to: 'lucky.kshp@gmail.com',
//     subject: 'Nodemailer SMTP transporter',
//     text: 'This is some text',
//     html: '<b>This is some HTML</b>',
// };

function mailOptions (data) {
    this.from = data.from;
    this.to =  data.to;
    this.subject =  data.subject;
    this.text = data.text;
    this.html =  data.html;
}

module.exports = {
    transporter,
    mailOptions
}



// transporter.verify().then(console.log).catch(console.error);
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.log(error);
        
//     } else {
//         console.log('Message sent: ' + info.response);
//     }
// });

