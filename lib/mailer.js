import { connectToDB } from "@mongodb";
import OTP from "@models/OTP";
import nodemailer from "nodemailer";

export const sendOTP = async (email) => {

  try {
    await connectToDB();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min from now
    const verified = false;

    await OTP.create({ email, otp, expiresAt, verified });


    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Verification Code",
      html: `
        <p>Hi There,</p>
        <p>Your verification code for <strong>MyChat</strong> is: <strong>${otp}</strong>.</p>
        <p>This code will expire in 10 minutes.</p>
        <br />
        <p>Regards,</p>
        <p><strong>My Chat Team</strong></p>
      `,
    });

    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: "Failed to send OTP", error };
  }
};
