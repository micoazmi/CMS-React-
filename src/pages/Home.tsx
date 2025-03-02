import  { useEffect, useState } from "react";
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
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Mediverse</h1>
        <div className="flex items-center gap-4">
          {email ? (
            <>
              <span className="text-sm">{email}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          )}
        </div>
      </nav>
      {/* Page Content */}
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Welcome to Mediverse!</h1>
      </div>
    </div>
  );
}
