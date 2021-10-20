const profiles = require("../data.json");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const prettier = require("prettier");

profiles.sort((a, b) => {
  if (a.githubUsername < b.githubUsername) return -1;

  if (a.githubUsername > b.githubUsername) return 1;

  return 0;
});

fs.writeFile(
  path.join(__dirname, "..", "data.json"),
  prettier.format(JSON.stringify(profiles), require("../.prettierrc.json")),
  (err) => {
    if (err) {
      console.log(err);
    }

    console.log("✅ Sorted the data.");
  }
);
