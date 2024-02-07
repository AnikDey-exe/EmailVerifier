const express = require('express')
const bodyParser = require('body-parser')

require("dotenv").config()

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.API_KEY)

const cors = require('cors')({ origin: true })
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors)

const port = process.env.PORT || 3000;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('Base url route')
})

//send post request
app.post("/sendemail", async (req, res) => {
  try {
    var string = "0123456789"
    var otp = ""
    var length = string.length

    for (let a = 0; a < 6; a++) {
      otp += string[Math.floor(Math.random() * length)]
    }
    
    const msg = {
      to: req.body.email, // Change to your recipient
      from: 'deyanik2007@gmail.com', // Change to your verified sender
      subject: 'Verify Your Identity',
      text: 'ExpressEats sent you a code for verification',
      html: `<strong>ExpressEats sent you a code for verification | Code: ${otp}</strong>`,
    }

    sgMail
      .send(msg)
      .then(() => {
        res.send({
          message: otp
        })
      })
      .catch((error) => {
        console.log(error.message)
        throw new Error(error.message)
      })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port 5000`);
});

