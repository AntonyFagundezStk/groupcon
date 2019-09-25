const nodemailer = require("nodemailer");
const keys = require("../config/keys");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

exports.sendInviteLinkMail = async (toEmail, inviteUrl, groupName) => {
  let transporter = await nodemailer.createTransport({
    host: keys.NODEMAILER_AUTH.HOST,
    port: keys.NODEMAILER_AUTH.PORT,
    secure: false,
    auth: {
      user: keys.NODEMAILER_AUTH.EMAIL_AUTH.email,
      pass: keys.NODEMAILER_AUTH.EMAIL_AUTH.password
    }
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve(__dirname, "emailTemplates"),
      layoutsDir: path.resolve(__dirname, "emailTemplates"),
      defaultLayout: "email.handlebars"
    },
    viewPath: path.resolve(__dirname, "emailTemplates"),
    extName: ".handlebars"
  };

  transporter.use("compile", hbs(handlebarOptions));

  let info = await transporter.sendMail({
    from: `"GroupCon 👻" <${keys.NODEMAILER_AUTH.EMAIL_AUTH.email}>`,
    to: toEmail,
    subject: `GroupCon invite to ${groupName} ✔`,
    text: "",
    template: "email",
    context: {
      groupName,
      inviteUrl
    }
  });
};
