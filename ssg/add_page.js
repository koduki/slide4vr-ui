const fs = require('fs');

const url = process.argv[2]
const ssgPage = JSON.parse(fs.readFileSync('ssg/ssg-pages.json'))

ssgPage["urls"].push(url)

fs.writeFileSync('ssg/ssg-pages.json', JSON.stringify(ssgPage));