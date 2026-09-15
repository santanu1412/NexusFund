import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"NexusFund" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error(`❌ Email send failed: ${error.message}`);
  }
};
export default sendEmail;
