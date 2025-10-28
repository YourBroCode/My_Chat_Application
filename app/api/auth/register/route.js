import { connectToDB } from "@mongodb";
import { sendOTP } from "@lib/mailer";
import User from "@models/User";
export const POST = async (req) => {
  try {
    await connectToDB();

    const { email} = await req.json();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Response("User already exists", {
        status: 400,
      });
    }

    const otpResponse = await sendOTP(email);
    if (!otpResponse.success) {
      return new Response("Failed to send OTP", { status: 500 });
    }

    return new Response(JSON.stringify({ message: "OTP sent successfully" }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response("Failed to process request", { status: 500 });
  }
};
