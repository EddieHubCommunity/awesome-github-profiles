const fs = require('fs');
const path = require('path');

const profilesFolder = path.join(__dirname, 'profiles'); // Update the folder path accordingly
const profiles = [];

fs.readdirSync(profilesFolder).forEach((file) => {
  if (file.endsWith('.json')) {
    const filePath = path.join(profilesFolder, file);
    const profileData = fs.readFileSync(filePath, 'utf-8');
    try {
      const profile = JSON.parse(profileData);
      if (profile.name && profile.image) {
        profiles.push(profile);
      }
    } catch (error) {
      console.error(`Error parsing JSON file ${file}: ${error}`);
    }
  }
});

// Generate the README content
const readmeContent = profiles
  .map((profile) => `- [${profile.name}](${profile.image})`)
  .join('\n');

console.log(readmeContent);
const existingReadmePath = path.join(__dirname, 'README.md'); // Update the path to your README.md file
const existingReadmeContent = fs.readFileSync(existingReadmePath, 'utf-8');
const marker = '<!-- INSERT_PROFILES_HERE -->'; // Replace with your specific marker
const updatedReadmeContent = existingReadmeContent.replace(marker, marker + '\n' + readmeContent);
// Write the content to README.md
fs.writeFileSync(existingReadmePath, updatedReadmeContent, 'utf-8');

