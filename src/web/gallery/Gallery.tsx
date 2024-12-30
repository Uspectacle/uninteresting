import { useEffect, useState } from "react";
import { NumberDisplay } from "./NumberDisplay";
import "./gallery.css";
import React from "react";
import { getNumbers, NumberEntry } from "../../database/API";

export default function Gallery() {
  const [numbers, setNumbers] = useState<NumberEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    try {
      const data = await getNumbers();

      setNumbers(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="gallery">
      <div className="header">
        <h1>Gallery of Uninteresting Numbers</h1>
        Welcome to The Gallery of Uninteresting Numbers! This project aims to
        collect and catalog numbers that, by the most obscure of standards, have
        no claims to fame in the digital or mathematical world. These numbers
        are the ones never mentioned in a YouTube video, never tweeted, never
        searched on Google, never written about in books, and not even worthy of
        a mention on Wikipedia. They are the numbers that live in the limbo of
        invisibility, quietly slipping through the cracks of human attention and
        digital knowledge.
      </div>
      {numbers.map((entry, index) => (
        <NumberDisplay entry={entry} key={`number-${index}`} />
      ))}
    </div>
  );
}
