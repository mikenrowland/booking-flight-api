const express = require("express");
const { json } = require("express");
const nodemailer = require("nodemailer");
require('dotenv').config();
// Routes
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");

const app = express();

app.use(json());

app.use("/", routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


async function mailSender() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
  });

  let info = await transporter.sendMail({
    from: "michaelrowland.ng@gmail.com", // sender address
    to: "mykhelmyers@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message successfully sent with ID: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

mailSender().catch(console.error);