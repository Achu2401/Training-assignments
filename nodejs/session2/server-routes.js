const http = require('http')

const server = http.createServer((req, res) => {

  console.log(`${req.method} ${req.url}`)

  if (req.url === '/') {

    res.writeHead(200, {
  'Content-Type': 'text/html'
})

    res.end(`
    <!DOCTYPE html>
    <html>
    <head>
    <title>Home</title>
    </head>
    <body>
    <h1>Welcome to Node.js</h1>
    <p>This is the home page.</p>
    </body>
    </html>
    `)

  } else if (req.url === '/about') {

    res.writeHead(200, {
      'Content-Type': 'text/plain'
    })

    res.end('About page')

  } else if (req.url === '/status') {

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })

    res.end(JSON.stringify({
      status: 'ok',
      uptime: process.uptime()
    }))

  } else {

    res.writeHead(404, {
      'Content-Type': 'text/plain'
    })

    res.end('404 — Page not found')
  }
})

server.listen(3001, () => {
  console.log('Server running at http://localhost:3001')
})

/*
Explore:

process.uptime()
- Returns the number of seconds the current Node.js process
  has been running since it started.

Content-Type: application/json
- Tells the browser that the response data is in JSON format.
- The browser or other applications can then parse the response
  as JSON instead of plain text.
*/