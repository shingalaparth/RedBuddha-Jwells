import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
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

// Send an email using async/await with error handling
const sendmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: 'RedBuddha Jwells <kapilkariya77@gmail.com>',
      to,
      subject,
      text, // Plain-text version of the message
      html, // HTML version of the message
    });

    // Email sent successfully (silently)
    return { success: true, messageId: info.messageId };
  } catch (error) {
    // Email failed (silently) - don't crash the server
    return { success: false, error: error.message };
  }
};

export default sendmail