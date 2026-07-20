// ---------- Task 1 ----------
const fs = require('fs').promises
const path = require('path')

async function fileDemo() {
  const filePath = path.join(__dirname, 'async-output.txt')

  await fs.writeFile(filePath, 'Line 1')

  const content = await fs.readFile(filePath, 'utf8')
  console.log(content)

  await fs.appendFile(filePath, '\nLine 2')

  const updated = await fs.readFile(filePath, 'utf8')
  console.log(updated)
}

fileDemo().catch(console.error)


// ---------- Task 4 ----------
const fsSync = require('fs')

const folder = __dirname

const files = fsSync.readdirSync(folder)

files.forEach(file => {
  if (path.extname(file) === '.js') {
    const filePath = path.join(folder, file)
    const stats = fsSync.statSync(filePath)
    const sizeKB = (stats.size / 1024).toFixed(2)

    console.log(`${file} - ${sizeKB} KB`)
  }
})