const path = require("path");
const fs = require("fs");

// load json files
const readDirectoryPath = path.join(__dirname, "data", "profiles");
const files = fs.readdirSync(readDirectoryPath);
const profiles = files.map((file) => {
  const data = JSON.parse(
    fs.readFileSync(`${path.join(__dirname, "data", "profiles", file)}`, "utf8")
  );
  return {
    username: file.split(".")[0],
    ...data,
  };
});

// generate list file
const writeDirectoryPath = path.join(__dirname, "data", "list.json");
const output = profiles.map((profile) => ({
  name: profile.name,
  username: profile.username,
  image: profile.image,
  issueId: profile.issueId,
}));

fs.writeFileSync(writeDirectoryPath, JSON.stringify(output));
