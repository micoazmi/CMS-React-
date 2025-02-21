import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";

export default function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
      } else if (user) {
        setEmail(user.email || "");
      }
    };

    fetchUser();
  }, []);

  // Handle Sign Out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login"); // Redirect to login after sign out
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Hello, {email || "User"}!</h1>
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Sign Out
      </button>
    </div>
  );
}
