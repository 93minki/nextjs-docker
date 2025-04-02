"use client";

import { useEffect, useState } from "react";

export const VersionTest = () => {
  const [gistVersion, setGistVersion] = useState<Record<string, string> | null>(
    null
  );
  const [jsonVersion, setJsonVersion] = useState<Record<string, string> | null>(
    null
  );

  useEffect(() => {
    const fetchVersion = async () => {
      const response = await fetch("/api/version-gist", {
        cache: "no-store",
      });
      const data = await response.json();
      setGistVersion(data);
    };
    const fetchJsonFile = async () => {
      const response = await fetch("/api/version-json", {
        cache: "no-store",
      });
      const data = await response.json();
      setJsonVersion(data);
    };

    fetchVersion();
    fetchJsonFile();
  }, []);

  if (!gistVersion || !jsonVersion) return <div>Loading...</div>;

  return (
    <div>
      <h2>App Version - By GIST</h2>
      <ul>
        {Object.entries(gistVersion).map(([app, ver]) => (
          <li key={app}>
            {app}: {ver}
          </li>
        ))}
      </ul>
      <h2>App Version - By JSON</h2>
      <ul>
        {Object.entries(jsonVersion).map(([app, ver]) => (
          <li key={app}>
            {app}: {ver}
          </li>
        ))}
      </ul>
    </div>
  );
};
