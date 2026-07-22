const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'data.json')

// Read the JSON file as text.
const raw = fs.readFileSync(filePath, 'utf8')

// Converts the JSON string into a JavaScript array of objects.
// Without JSON.parse(), 'raw' would remain a plain string,
// and you could not use array methods like filter() or reduce().
const users = JSON.parse(raw)

console.log('All users:', users)
console.log('Total:', users.length)

// Find users with scores greater than or equal to 90.
const top = users.filter(u => u.score >= 90)
console.log('Top scorers:', top.map(u => u.name))

// Calculate the average score.
const avg = users.reduce((sum, u) => sum + u.score, 0) / users.length
console.log('Average score:', avg.toFixed(1))

// ---------------- Task 5.2 ----------------

// Add a new user.
const newUser = {
  id: 5,
  name: 'Vikram',
  role: 'intern',
  score: 88
}

users.push(newUser)

// Converts the JavaScript array back into JSON text.
// 'null, 2' formats the JSON with 2-space indentation,
// making it easier to read.
// Without 'null, 2', the entire JSON would be written on one line.
const updated = JSON.stringify(users, null, 2)

fs.writeFileSync(filePath, updated)

console.log('User added and file updated')

// Verify that the new user was saved.
const verify = JSON.parse(fs.readFileSync(filePath, 'utf8'))
console.log('Total after update:', verify.length)

// ---------------- Task 5.3 ----------------

// Read the latest data from the file.
const currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'))

// Find the index of the user named Amit.
const index = currentData.findIndex(u => u.name === 'Amit')

if (index !== -1) {
  currentData[index].score = 90

  fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2))

  console.log('Amit score updated to 90')
}

/*
Difference between Array.find() and Array.findIndex()

Array.find()
- Returns the actual object that matches the condition.
- Returns undefined if no match is found.

Array.findIndex()
- Returns the index (position) of the matching element.
- Returns -1 if no match is found.

Use findIndex() when you need to update, replace,
or remove an element in the array because you need
its position.
*/