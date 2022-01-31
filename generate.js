const fs = require("fs");
const path = require("path");

fs.readdir(
  path.join(__dirname, "profiles"),
  {
    withFileTypes: true,
  },
  (err, files) => {
    if (err) {
      throw err;
    }

    const profiles = [];

    fs.mkdir(path.join(__dirname, ".cache"), { recursive: true }, () => {});

    files.forEach((file) => {
      const profile = require(path.join(__dirname, "profiles", file.name));

      profiles.push(profile);
    });

    const sorted = profiles.sort((a, b) => {
      if (a.name < b.name) return -1;

      if (a.name > b.name) return 1;

      return 0;
    });

    fs.writeFile(
      path.join(__dirname, ".cache", "data.json"),
      JSON.stringify(sorted),
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  }
);
