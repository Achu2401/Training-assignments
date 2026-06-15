//Activity 1 — Understanding Async Behaviour

// 1. Run this and observe the order of output — explain in a comment why "3" logs before "2"
console.log("1")
setTimeout(()=>console.log("2"),1000)
console.log("3")

// Output:
// 1
// 3
// 2

// "3" logs before "2" because setTimeout is asynchronous.
// It schedules the callback to run after 1000ms, so the synchronous code

// 2. Now change the timeout to 0ms — does "2" still log last? Explain why in a comment
console.log("1")
setTimeout(() => console.log("2"), 0)
console.log("3")

// Output:
// 1
// 3
// 2

// Yes, "2" still logs last. A 0ms timeout does not execute immediately.
// The callback is added to the event queue and runs only after the current
// synchronous code finishes and the call stack becomes empty.


// 3. Write your own example using setTimeout:

console.log("Fetching data...")
setTimeout(()=>{console.log("Data received!")},2000)

//Activity 2 — Promises

// 1. A Promise is already written below — it randomly succeeds or fails
//    Add .then() and .catch() to handle both outcomes and log a message for each

const getData = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5
  setTimeout(() => {
    if (success) resolve("Data loaded!")
    else reject("Something went wrong")},1000)
})

// Add your .then() and .catch() here

getData
  .then((result) => {console.log(result)})
  .catch((error) => {console.log(error)})

// 2. Chain Promises

const startValue = new Promise((resolve) => resolve(5))

startValue
  .then((num) => {return num *2})
  .then((num) => {return num +10})
  .then((result) => {console.log(result)})

// 3. Promise.all
const promise1 = new Promise((resolve) =>
  setTimeout(() => resolve("User loaded"), 1000))

const promise2 = new Promise((resolve) =>
  setTimeout(() => resolve("Orders loaded"), 1500))

Promise.all([promise1, promise2])
  .then((results) => {console.log(results)})
  .catch((error) => {console.log(error)})

//Activity 3 — async / await

// 1. Rewrite this Promise chain using async/await

const fetchUser =async()=>{
  try {
    const response= await fetch("https://jsonplaceholder.typicode.com/users/1")
    const user =await response.json()
    console.log(user.name)
  } catch (error){
    console.log(error)
  }
}
fetchUser()

// 2. Write an async function getUserById(id)
const getUserById =async (id) => {
  try {
    const response=await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    )
    const user=await response.json()
    return {
      name:user.name,
      email:user.email,
    }
  } catch (error) {
    console.log(error)
  }
}
getUserById(3).then((result)=> console.log(result))

// 3. Write an async function getAllUsers()

const getAllUsers =async () => {
  try {
    const response=await fetch(
      "https://jsonplaceholder.typicode.com/users"
    )
    const users =await response.json()

    return users.map((user)=>({
      name:user.name,
      email:user.email,
    }))
  } catch (error){
    console.log(error)
  }
}
getAllUsers().then((result) => console.log(result))

//Activity 4 — Error Handling
// 1. The function below has no error handling

const fetchUser1 = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1")

    if (!response.ok) {
      throw new Error("Failed to fetch user")
    }

    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log("Caught:", error.message)
  }
}

fetchUser1()

// 2. fetch() does NOT throw an error on 404

const fetchMissing=async() => {
  try {
    const response=await fetch("https://jsonplaceholder.typicode.com/users/99999")

    if (!response.ok) {throw new Error(`HTTP Error: ${response.status}`)}
    const data=await response.json()
    console.log(data)
  } catch (error){
    console.log("Caught:", error.message)
  }
}
fetchMissing()

// 3. Use Promise.allSettled to run two fetches

const fetchBoth = async () => {
  const results = await Promise.allSettled([
    fetch("https://jsonplaceholder.typicode.com/users/1"),
    Promise.reject("Invalid request")
  ])

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Request ${index + 1} succeeded`)
    } else {
      console.log(`Request ${index + 1} failed`)
    }
  })
}

fetchBoth()

//Activity 5 — DOM: Select & Update

// 1. Select the #title element and change its text

const title=document.getElementById("title")
title.textContent="Hello, Intern!"


// 2. Select #subtitle and change its colour to blue using JS

const subtitle=document.getElementById("subtitle")
subtitle.style.color="blue"

// 3. Read the current text inside and update it back in the DOM

const counter=document.getElementById("counter")
const count=Number(counter.textContent)
counter.textContent =count + 1

// 4. Create a list of 3 names using JS and render them as <li> items inside #user-list

const names = ["Alice", "Bob", "Carol"]
const userList = document.getElementById("user-list")
names.forEach((name) => {
  const li = document.createElement("li")
  li.textContent = name
  userList.appendChild(li)
})

// 5. Create a CSS class in a <style> tag, then toggle it on #title

function toggleTitle() {
  title.classList.toggle("highlight")
}
toggleTitle()


//Activity 6 — Events

/// Select elements
const greetBtn= document.getElementById("greet-btn")
const addBtn =document.getElementById("add-btn")
const resetBtn= document.getElementById("reset-btn")
const nameInput =document.getElementById("name-input")
const greeting =document.getElementById("greeting")
const clickCount= document.getElementById("click-count")

// 1. Greet button
function greetUser(){
  const name = nameInput.value.trim()
  if (name==="") {
    greeting.textContent="Please enter a name"
  }else{
    greeting.textContent=`Hello, ${name}!`
  }
}
greetBtn.addEventListener("click", greetUser)

// 2. Track clicks
let clickNum=0
addBtn.addEventListener("click",()=>{
  clickNum++
  clickCount.textContent=`Clicks: ${clickNum}`
})
resetBtn.addEventListener("click",()=>{
  clickNum=0
  clickCount.textContent= `Clicks:${clickNum}`
})

// 3. Live input
nameInput.addEventListener("input",()=>{
  const name = nameInput.value.trim()
  if (name===""){
    greeting.textContent=""
  }else{
    greeting.textContent=`Hello,${name}!`
  }
})

// 4. Press Enter to greet
nameInput.addEventListener("keydown",(event)=>{
  if (event.key==="Enter"){
    greetUser()
  }
})

//Activity 7 — Fetch + DOM (Full Flow)
// Select elements
const loadBtn =document.getElementById("load-btn")
const statusText= document.getElementById("status")
const usersContainer =document.getElementById("users-container")
const searchInput=document.getElementById("search")
const cancelBtn = document.getElementById("cancel-btn")
let controller

// Store users for searching
let allUsers = []

// Function to display users
function renderUsers(users){
  usersContainer.innerHTML= ""

  users.forEach((user) =>{
    const div =document.createElement("div")

    div.innerHTML= `
      <h3>${user.name}</h3>
      <p>Email: ${user.email}</p>
      <p>City: ${user.address.city}</p>
      <hr>
    `
    usersContainer.appendChild(div)
  })
}

// Load users
loadBtn.addEventListener("click", async () => {
  statusText.textContent="Loading..."
  usersContainer.innerHTML=""
  controller = new AbortController()
  try{
    const response = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    {
        signal: controller.signal
    }
    )
    if (!response.ok){
      throw new Error("Failed")
    }
    allUsers=await response.json()
    localStorage.setItem("savedUsers", JSON.stringify(allUsers))
    renderUsers(allUsers)    // Activity 7
    //renderUsersSafe(allUsers)   // Activity 8
    statusText.textContent=`${allUsers.length} users loaded`
  }catch (error) {
    if (error.name === "AbortError") {
        statusText.textContent = "Fetch cancelled"
    } else {
        statusText.textContent = "Failed to load users. Try again."
    }

    usersContainer.innerHTML = ""
    }
})
//Activity 8 – Task 4
cancelBtn.addEventListener("click", () => {
  if (controller) {
    controller.abort()
  }
})
// Search users
searchInput.addEventListener("input",()=>{
  const searchText= searchInput.value.toLowerCase()
  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchText)
  )
  renderUsers(filteredUsers)    // Activity 7
  //renderUsersSafe(filteredUsers)   // Activity 8
})

// Activity 8 - Task 1

const loadUserPosts=async () => {
  try{
    const [userRes, postsRes]=await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users/1"),
      fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
    ])
    const user=await userRes.json()
    const posts=await postsRes.json()
    console.log(`${user.name} has ${posts.length} posts`)
  }catch (error){
    console.log(error)
  }
}
loadUserPosts()

// Activity 8 - Task 2

function renderUsersSafe(users) {
  usersContainer.innerHTML = ""

  users.forEach((user) => {
    const div = document.createElement("div")

    const name = document.createElement("h3")
    name.textContent = user.name

    const email = document.createElement("p")
    email.textContent = `Email: ${user.email}`

    const city = document.createElement("p")
    city.textContent = `City: ${user.address.city}`

    div.appendChild(name)
    div.appendChild(email)
    div.appendChild(city)

    usersContainer.appendChild(div)
  })
}

//Activity 8 - Task 3

const savedUsers = JSON.parse(localStorage.getItem("savedUsers"))
if (savedUsers) {
  allUsers = savedUsers
  renderUsers(allUsers)
  //renderUsersSafe(allUsers)
  statusText.textContent = `${allUsers.length} users loaded (from storage)`
}



