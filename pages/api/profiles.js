import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const relativeDir = path.resolve("./public", "profiles");
  const files = fs.readdirSync(relativeDir);

  const profiles = await Promise.all(
    files.map(async (file) => {
      const response = await fetch(
        `http://localhost:3000${path.join("/", "profiles", file)}`
      );
      if (response.ok) {
        const data = await response.json();
        return { username: file.split(".")[0], ...data };
      }
    })
  );

  const output = profiles.map((profile) => ({
    ...profile,
  }));
  res.status(200).json(output);
}
