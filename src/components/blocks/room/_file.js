const fs = require('fs');
const path = require('path');

const fileDir = path.join(__dirname, 'assets', 'images', 'rooms');
console.log(__dirname);
const array = fs.readdir(fileDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

export default array;
