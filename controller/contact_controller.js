const nodemailer = require('nodemailer');
const Imap = require('imap');

const senderEmail = 'contact@mohamedlaraiche.com';
const senderPassword = 'Mohamed$Laraiche@0663733223';
const smtpServer = 'smtp.titan.email';
const smtpPort = 465;
const imapServer = 'imap.titan.email';
const imapPort = 993;

const transporter = nodemailer.createTransport({
  host: smtpServer,
  port: smtpPort,
  secure: true,
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
});

function appendToSentFolder(recipientEmail, subject, body) {
  const imap = new Imap({
    user: senderEmail,
    password: senderPassword,
    host: imapServer,
    port: imapPort,
    tls: true,
  });

  imap.once('ready', () => {
    imap.openBox('Sent', true, (err) => {
      if (err) {
        console.error('Error opening "Sent" folder:', err);
        imap.end();
        return;
      }

      const emailMessage = `From: ${senderEmail}\r\nTo: ${recipientEmail}\r\nSubject: ${subject}\r\n\r\n${body}`;

      imap.append(emailMessage, { mailbox: 'Sent' }, (appendErr) => {
        if (appendErr) {
          console.error('Error appending email to "Sent" folder:', appendErr);
        } else {
          console.log('Email appended to "Sent" folder.');
        }
        imap.end();
      });
    });
  });

  imap.once('error', (imapErr) => {
    console.error('IMAP Error:', imapErr);
  });

  imap.connect();
}

const sendEmail = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    if (!fullName || !email || !message) {
      res.status(400).json({ unValid: 'Please fill the fields' });
    } else {
      const mailOptions = {
        from: senderEmail,
        to: 'laraichemohamed@gmail.com',
        subject: `New contact from ${fullName}`,
        text: `Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.send('error');
        } else {
          console.log('Email sent: ' + info.response);

          appendToSentFolder(
            'recipient@example.com',
            `New contact from ${fullName}`,
            `Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`
          );
          res.send('sent');
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = sendEmail;
