const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , x-auth-token');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next()
})

app.get('/users', (req, res) => {
  res.json({
    code: 0,
    message: 'Success',
    data: [
      {
        id: 1,
        name: 'john'
      }
    ]
  })
})

app.post('/users', (req, res) => {
  res.json({
    code: 0,
    message: 'add user success'
  })
})

app.get('/error', (req, res) => {
  res.json({
    code: 100,
    message: 'get failed'
  })
})

app.listen(PORT, () => {
  console.log(`Server is listening at localhost:${PORT}`)
})

