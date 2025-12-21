"use client";
import { useState } from "react";
import {
  EmailOutlined,
  Visibility,
  VisibilityOff,
  PersonOutline,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
const Form = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // Step 1 for email, Step 2 for OTP

  const onSubmit = async (data) => {
    if (type === "register") {
      if(step === 1) {
        // Store registration data in localStorage
        localStorage.setItem('registrationData', JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password
        }));

        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email: data.email}),
        });

        if (res.ok) {
          toast.success("OTP sent to your email.");
          setStep(2); // Move to Step 2
          router.push("/verify-email");
        } else {
          const error = await res.json();
          toast.error(error.message || "Failed to send OTP");
        }
      }
       if(step === 2) {
        const res = await fetch("/api/auth/verify-otp" ,{
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            otp: otp,
            username: data.username,
            password: data.password,
          }),
        });
        if (res.ok) {
          toast.success("OTP verified successfully. Please login.");
          router.push("/");
        } else {
          const error = await res.json();
          toast.error(error.message || "Failed to verify OTP");
        }

      }

      }

      if (type === "login") {
        const res = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        if (res.ok) {
          router.push("/chats");
        }

        if (res.error) {
          toast.error("Invalid email or password");
        }
      }
    };

    return (
      <div className="auth auth-bg">
        <div className="content">
          <img src="/assets/LogoShyam1.png" alt="logo" className="logo" />

          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {type === "register" && (
              <div>
                <div className="input">
                  <input
                    defaultValue=""
                    {...register("username", {
                      required: "Username is required",
                      validate: (value) => {
                        if (value.length < 3) {
                          return "Username must be at least 3 characters";
                        }
                      },
                    })}
                    type="text"
                    placeholder="Username"
                    className="input-field"
                  />
                  <PersonOutline sx={{ color: "#737373" }} />
                </div>
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
              </div>
            )}

            <div>
              <div className="input">
                <input
                  defaultValue=""
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="Email"
                  className="input-field"
                />
                <EmailOutlined sx={{ color: "#737373" }} />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="input">
                <input
                  defaultValue=""
                  {...register("password", {
                    required: "Password is required",
                    validate: (value) => {
                      if (
                        value.length < 5 ||
                        !value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/)
                      ) {
                        return "Password must be at least 5 characters and contain at least one special character";
                      }
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input-field"
                />
                {showPassword ? (
                  <VisibilityOff
                    sx={{ color: "#737373", cursor: "pointer" }}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Visibility
                    sx={{ color: "#737373", cursor: "pointer" }}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <button className="button" type="submit">
              {type === "register" ? "Sign up" : "Login"}
            </button>
          </form>

          {type === "register" ? (
            <p className="text-center text-white">
              {" "}
              Already have an account?
              <Link href="/" className="link">
                {" "}
                Sign In Here
              </Link>
            </p>
          ) : (
            <div>
              <p className="text-center text-white">
                Don't have an account?{" "}
                <Link href="/register" className="link">
                  Register Here
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default Form;
