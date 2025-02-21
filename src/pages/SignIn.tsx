import React, { useState } from "react";
import Button from "../component/Button";
import InputField from "../component/InputField"; // Import InputField
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router";

export default function SignIn() {
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle login
  const handleLogin = async () => {
    setErrors({}); // Reset errors before validation

    // Basic form validation
    const newErrors: { email?: string; password?: string } = {};
    if (!loginForm.email) newErrors.email = "Email tidak boleh kosong";
    if (!loginForm.password) newErrors.password = "Kata sandi tidak boleh kosong";

    // If there are errors, update state and prevent submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Supabase authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });

    if (error) {
      setErrors({ email: "Email atau password salah" });
    } else {
      console.log("Login successful:", data);
      navigate("/home"); // Redirect after login
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  return (
    <div className="flex h-screen">
      {/* Logo */}
      <img
        src="/react.svg"
        alt="Mediverse Logo"
        className="absolute top-6 left-6 w-32"
      />

      {/* Left Section - Login Form */}
      <div className="w-1/3 flex flex-col justify-center items-center px-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang</h1>
        <p className="text-gray-600 text-center mb-6">
          Masuk dan kelola dashboard Mediverse Anda sekarang
        </p>

        {/* Email Input Using InputField Component */}
        <InputField
          label="Email"
          type="email"
          name="email"
          placeholder="Masukkan email"
          value={loginForm.email}
          onChange={handleChange}
          icon={<FaEnvelope className="text-gray-500 mr-2" />}
          error={errors.email} // Pass error state
        />

        {/* Password Input Using InputField Component */}
        <InputField
          label="Kata Sandi"
          type="password"
          name="password"
          placeholder="Masukkan kata sandi"
          value={loginForm.password}
          onChange={handleChange}
          icon={<FaLock className="text-gray-500 mr-2" />}
          error={errors.password} // Pass error state
        />

        {/* Forgot Password */}
        <p className="text-sm text-gray-500 text-right w-full mb-4 cursor-pointer">
          Lupa Kata Sandi?
        </p>

        {/* Login Button */}
        <Button
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700"
          onClick={handleLogin}
        >
          MASUK SEKARANG <IoMdArrowForward />
        </Button>

        {/* Register Button */}
        <p className="text-sm text-gray-500 mt-4">
          Belum punya akun?{" "}
          <span
            className="text-purple-600 cursor-pointer font-semibold"
            onClick={() => navigate("/register")}
          >
            Daftar di sini
          </span>
        </p>
      </div>

      {/* Right Section - Image */}
      <div className="w-2/3 flex items-center justify-center bg-gradient-to-b from-purple-600 to-indigo-800 rounded-l-3xl">
        <div className="text-center">
          <img src="/mediverse.png" alt="Healthcare Assistant" className="w-96 mx-auto" />
          <h2 className="text-white text-2xl font-semibold mt-4">
            Your Personal Healthcare Assistant
          </h2>
        </div>
      </div>
    </div>
  );
}
