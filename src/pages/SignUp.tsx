import React, { useState } from "react";
import Button from "../component/Button";
import InputField from "../component/InputField"; // Import InputField
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";

export default function SignUp() {
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle register
  const handleRegister = async () => {
    setErrors({}); // Reset errors before validation

    // Basic validation
    const newErrors: { email?: string; password?: string } = {};
    if (!registerForm.email) newErrors.email = "Email tidak boleh kosong";
    if (!registerForm.password) newErrors.password = "Kata sandi tidak boleh kosong";

    // Jika ada error, set error state
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: registerForm.email,
      password: registerForm.password,
    });

    if (error) {
      setErrors({ email: "Gagal mendaftar. Email mungkin sudah digunakan." });
    } else {
      console.log("Register successful:", data);
      navigate("/login"); // Redirect setelah register berhasil
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        {/* Email Input */}
        <InputField
          label="Email"
          type="email"
          name="email"
          placeholder="Masukkan email"
          value={registerForm.email}
          onChange={handleChange}
          icon={<FaEnvelope className="text-gray-500 mr-2" />}
          error={errors.email} // Pass error state
        />

        {/* Password Input */}
        <InputField
          label="Kata Sandi"
          type="password"
          name="password"
          placeholder="Masukkan kata sandi"
          value={registerForm.password}
          onChange={handleChange}
          icon={<FaLock className="text-gray-500 mr-2" />}
          error={errors.password} // Pass error state
        />

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
