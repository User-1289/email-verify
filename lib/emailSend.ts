import nodemailer from 'nodemailer';
// Configure the email transport using SMTP
const googleAcAppKey = process.env.GOOGLE_EMAIL_KEY || '';
console.log(googleAcAppKey)

const transporter = nodemailer.createTransport({
  //host: 'smtp.example.com', // Replace with your SMTP host
  //port: 587, // Replace with your SMTP port
  //secure: false, // Use true for 465, false for other ports
  service:"Gmail",
  auth: {
    user: 'deverse.space@gmail.com', // Replace with your email
    pass:googleAcAppKey
  },
});

export async function sendConfirmEmail(verificationCode:string, recipientEmail:string) {
  // Define the email options
  const mailOptions = {
    from: 'deverse.space@gmail.com', // Replace with your sender address
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
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
    return {status:'success'}
  } catch (error) {
    console.error('Error sending verification email:', error);
    return {status:'fail', error:error}
    throw new Error('Unable to send verification email');
  }
}
