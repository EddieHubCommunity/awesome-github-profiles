const profiles = require("../data.json");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

profiles.sort((a, b) => {
  if (a.githubUsername < b.githubUsername) return -1;

  if (a.githubUsername > b.githubUsername) return 1;

  return 0;
});

fs.writeFile(
  path.join(__dirname, "..", "data.json"),
  JSON.stringify(profiles),
  (err) => {
    if (err) {
      console.log(err);
    }

    console.log('✅ Sorted the data. Will start formatting it now.')

    exec("prettier data.json --write")

    console.log('✅ Formatted the file')
  }
);
