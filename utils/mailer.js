const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "8d67879ff1b33c",
        pass: "0f88feb071b5eb"
    }
});
const sendWelcomeMail = async (email, name) => {
    await transporter.sendMail({
        from: '"App Team" <no-reply@app.com>',
        to: email,
        subject: "Welcome 🎉",
        html: `<h2>Hello ${name}</h2><p>Welcome to our platform!</p>`,
    });
};

module.exports = { sendWelcomeMail };
