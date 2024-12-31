import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { NumberEntry } from "../../../shared/database";
import { fetchDescription } from "../../utils/markdown";

type Props = {
  entry: NumberEntry;
};

export const NumberDisplay: React.FC<Props> = ({ entry }) => {
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    fetchInfos();
  }, [entry.source]);

  const fetchInfos = async () => {
    try {
      const data = await fetchDescription(entry);

      setDescription(data);
    } catch (error) {
      console.error("Error loading description", error);

      setDescription(null);
    }
  };

  return (
    <div className="card">
      <div className="number">{entry.current_number}</div>
      <div className="info">
        <ReactMarkdown>{description}</ReactMarkdown>
        <div className="timestamp">
          Last Updated: {new Date(entry.updated_at).toLocaleString()}
        </div>
      </div>
    </div>
  );
};
