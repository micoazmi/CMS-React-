import { useEffect, useState } from "react";
import { supabase } from "./supabase/supabase";



type location = {
  id: number;
  city: string;
  street: string;
  postal_code: number;
};

function App() {
  const [location, setlocation] = useState<location[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    fetchlocation();
  }, []);

  async function fetchlocation() {
    setLoading(true); // Start loading
    let { data: location, error } = await supabase.from("location").select("*");

    if (error) {
      console.error("Error fetching location:", error);
      setError(error.message);
    } else {
      console.log("Fetched location:", location);
      setlocation(location || []);
    }
    setLoading(false); // Stop loading
  }

  return (
    <div>
      <h1>location List</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ul>
        {location.map((el) => (
          <li key={el.id}>{el.city}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
