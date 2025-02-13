import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ajebjltnqivmpnijkvee.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZWJqbHRucWl2bXBuaWprdmVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzNjI0MDcsImV4cCI6MjA1NDkzODQwN30.rXzixNvhSBtAjH6aB_YVJrg0reZ3Azc08ZpXLhjSq-Q"
);

type Instrument = {
  id: number;
  name: string;
};

function App() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    const { data } = await supabase.from("instruments").select();
    setInstruments(data || []); // Ensure `data` is an array
  }

  return (
    <ul>
      {instruments.map((instrument) => (
        <li key={instrument.id}>{instrument.name}</li>
      ))}
       {instruments.map((instrument) => (
        <li key={instrument.id}>{instrument.name}</li>
      ))}
        {instruments.map((instrument) => (
        <li key={instrument.id}>{instrument.name}</li>
      ))}
    </ul>
  );
}

export default App;
