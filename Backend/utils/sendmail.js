import nodemailer from 'nodemailer';

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "kapilkariya77@gmail.com",
    pass: "vjafrhufbfvucfqd",
  },
});



// Send an email using async/await
const sendmail =async (to,subject,text,html) => {
  const info = await transporter.sendMail({
    from: 'SparkNest <kapilkariya77@gmail.com>',
    to,
    subject,
    text, // Plain-text version of the message
    html, // HTML version of the message
    
  });

  console.log("Message sent:", info.messageId);
};

export default sendmail