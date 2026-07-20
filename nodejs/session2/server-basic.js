const http = require('http')

// req (request) contains information sent by the client,
// such as the request method, URL, and headers.
// res (response) is used by the server to send data
// back to the client.


// req contains information about the client's request.
// res is used to send the server's response.
const server = http.createServer((req, res) => {

  // req.method contains the HTTP method (GET, POST, PUT, DELETE, etc.)
  // req.url contains the requested path (/, /about, /users, etc.)
  console.log(`${req.method} ${req.url}`)

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello from Node.js!')
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})