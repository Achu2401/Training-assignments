const http = require('http')
const fs = require('fs')
const path = require('path')
const os = require('os')

const filePath = path.join(__dirname, 'data.json')

const server = http.createServer((req, res) => {

  console.log(`${req.method} ${req.url}`)

  // Read users from data.json
  const users = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  // GET /users
  if (req.method === 'GET' && req.url === '/users') {

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })

    return res.end(JSON.stringify(users))

  }

  // GET /users/top
  if (req.method === 'GET' && req.url === '/users/top') {

    const topUsers = users.filter(user => user.score >= 90)

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })

    return res.end(JSON.stringify(topUsers))

  }

  // GET /users/1
  if (req.method === 'GET' && req.url.startsWith('/users/')) {

    const id = Number(req.url.split('/')[2])

    const user = users.find(user => user.id === id)

    if (!user) {

      res.writeHead(404, {
        'Content-Type': 'application/json'
      })

      return res.end(JSON.stringify({
        error: 'User not found'
      }))
    }

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })

    return res.end(JSON.stringify(user))

  }

  // GET /health
  if (req.method === 'GET' && req.url === '/health') {

    const health = {
      status: 'ok',
      platform: os.platform(),
      memory: {
        totalMB: Math.round(os.totalmem() / 1024 / 1024),
        freeMB: Math.round(os.freemem() / 1024 / 1024)
      },
      uptime: Number(process.uptime().toFixed(1))
    }

    res.writeHead(200, {
      'Content-Type': 'application/json'
    })

    return res.end(JSON.stringify(health))
  }

  // Unknown route
  res.writeHead(404, {
    'Content-Type': 'application/json'
  })

  res.end(JSON.stringify({
    error: 'Route not found'
  }))
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})

/*
Health Check Route

Health check endpoints allow monitoring systems to verify
that a server is running correctly.

Tools such as Docker, Kubernetes, cloud platforms,
and load balancers periodically call this endpoint.
If the server does not respond correctly, it can be
restarted automatically or removed from service until
it becomes healthy again.
*/