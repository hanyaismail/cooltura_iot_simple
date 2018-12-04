const http = require('http').createServer(handler);
const fs = require('fs')
const io = require('socket.io')(http)

http.listen(8080, () => {
  console.log('listening on port 8080')
});

function handler(req, res) {
  fs.readFile(__dirname + '/public/index.html', (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}

io.on('connection', socket => {
  socket.emit('news', {hello: 'world'});
  socket.on('myOtherEvent', data => {
    console.log('data', data);
  })
})