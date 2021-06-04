const http = require('http')

//Express server
const app = require('./backend/app')
app.set('port', 8080)
const server = http.createServer(app)
server.listen(8080)
