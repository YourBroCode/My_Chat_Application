"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const VerifyEmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);

  useEffect(() => {
    // Retrieve registration data from localStorage
    const storedData = localStorage.getItem('registrationData');
    if (!storedData) {
      toast.error("Registration data not found. Please register again.");
      router.push("/register");
      return;
    }
    setRegistrationData(JSON.parse(storedData));
  }, [router]);

  const onSubmit = async (data) => {
    if (!registrationData) {
      toast.error("Registration data not found. Please register again.");
      router.push("/register");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registrationData.email,
          otp: data.otp,
          username: registrationData.username,
          password: registrationData.password,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        // Clear the stored registration data
        localStorage.removeItem('registrationData');
        toast.success("OTP verified successfully. Please login.");
        router.push("/");
      } else {
        toast.error(result.message || "Invalid OTP");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!registrationData) {
    return null; // or a loading spinner
  }

  return (
    <div className="auth auth-bg">
      <div className="content">
        <img src="/assets/LogoShyam1.png" alt="logo" className="logo" />

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <input
              {...register("otp", { required: "OTP is required" })}
              type="text"
              placeholder="Enter OTP"
              className="input-field"
            />
          </div>
          {errors.otp && (
            <p className="text-red-500">{errors.otp.message}</p>
          )}

          <button className="button" type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
