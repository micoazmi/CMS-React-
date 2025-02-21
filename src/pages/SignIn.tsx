import React, { useState } from "react";
import Button from "../component/Button";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router";

export default function SignIn() {
  const [error, setError] = useState("");
  const [loginForm, setLoginForm] = useState({
    email:"",password:""
  })

  const navigate = useNavigate();

  // Handle login
  const handleLogin = async () => {
    setError(""); // Reset error before login
    const { data, error } = await supabase.auth.signInWithPassword({
      email:loginForm.email,
      password:loginForm.password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("Login successful:", data);
      navigate("/"); // Redirect after login
    }
  };

  const handleChange = (e:any)=>{
    const {name,value}= e.target;
    setLoginForm({
      ...loginForm,
      [name]:value
    })
  }

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

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Email Input */}
        <div className="w-full mb-4">
          <label className="text-gray-700 font-medium">Email</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Masukkan email"
              className="w-full focus:outline-none"
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
              placeholder="Masukkan kata sandi"
              className="w-full focus:outline-none"
              onChange={handleChange}
            />
          </div>
        </div>

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
