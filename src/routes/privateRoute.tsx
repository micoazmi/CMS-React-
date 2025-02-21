import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

export default function PrivateRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkUser();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>; // Prevent flickering

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
