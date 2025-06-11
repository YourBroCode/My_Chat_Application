import { connectToDB } from "@mongodb";
import OTP from "@models/OTP";
import User from "@models/User";   
import { hash } from "bcryptjs"

export const POST = async (req) => {
  try {
    const { email, otp, username, password } = await req.json();

    if (!email || !otp || !username || !password) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    await connectToDB();

    // Find the OTP record
    const record = await OTP.findOne({
      email,
      otp,
      verified: false,
      expiresAt: { $gt: new Date() }
    });

    if (!record) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired OTP" }),
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create the user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Mark OTP as verified
    await OTP.findByIdAndUpdate(record._id, {
      verified: true,
      otp: undefined,
      expiresAt: undefined,
    });

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in verify-otp:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
};
