import nodemailer from 'nodemailer';

const googleAcAppKey = process.env.GOOGLE_EMAIL_KEY || '';

// Configure the email transport using SMTP
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'deverse.space@gmail.com',
    pass: googleAcAppKey,
  },
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error with SMTP configuration:', error);
  } else {
    console.log('SMTP configuration is correct:', success);
  }
});

export async function sendConfirmEmail(verificationCode:string, recipientEmail:string) {
  const mailOptions = {
    from: 'deverse.space@gmail.com',
    to: recipientEmail,
    subject: 'Your Verification Code',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Verification Code</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding: 10px 0;
          }
          .content {
            padding: 20px;
          }
          .code {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            text-align: center;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #999;
            padding: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Welcome to Daily.Routine</h2>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>Thank you for signing up for our service. To complete your registration, please use the verification code below:</p>
            <div class="code">${verificationCode}</div>
            <p>If you did not sign up for this account, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Our Service. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    // Verify SMTP connection before sending email
    await transporter.verify();

    // Send the email
    //await transporter.sendMail(mailOptions);
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err:any, info:any) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
    console.log('Verification email sent successfully');
    return { status: 'success' };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { status: 'fail', error: error.message };
  }
}
