import React, { useState } from "react";
import Button from "../component/Button";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";

export default function SignUp() {
  const [error, setError] = useState("");
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle register
  const handleRegister = async () => {
    setError(""); // Reset error before register
    const { data, error } = await supabase.auth.signUp({
      email: registerForm.email,
      password: registerForm.password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("Register successful:", data);
      navigate("/login"); // Redirect after register
    }
  };

  // Handle input change
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterForm({
      ...registerForm,
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

      {/* Left Section - Register Form */}
      <div className="w-1/3 flex flex-col justify-center items-center px-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daftar</h1>
        <p className="text-gray-600 text-center mb-6">
          Buat akun untuk mengelola dashboard Mediverse Anda
        </p>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Email Input */}
        <div className="w-full mb-4">
          <label className="text-gray-700 font-medium">Email</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Masukkan email"
              className="w-full focus:outline-none"
              value={registerForm.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="w-full mb-4">
          <label className="text-gray-700 font-medium">Kata Sandi</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Masukkan kata sandi"
              className="w-full focus:outline-none"
              value={registerForm.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Register Button */}
        <Button
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700"
          onClick={handleRegister}
        >
          DAFTAR <IoMdArrowForward />
        </Button>

        {/* Sudah Punya Akun? */}
        <p className="text-sm text-gray-500 mt-4">
          Sudah punya akun?{" "}
          <span
            className="text-purple-600 cursor-pointer font-semibold"
            onClick={() => navigate("/login")}
          >
            Login di sini
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
