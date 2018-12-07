const http = require('http').createServer(handler);
const fs = require('fs')
const io = require('socket.io')(http)
// const Gpio = require('onoff').Gpio

// const fogger1 = new Gpio(4, 'out')
// const fogger2 = new Gpio(5, 'out')
// const fogger3 = new Gpio(6, 'out')

// const light1 = new Gpio(7, 'out')
// const light2 = new Gpio(8, 'out')
// const light3 = new Gpio(9, 'out')

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
  socket.on('light', data => {
    console.log('light data', data)
    lightValue = data.state;
    socket.broadcast.emit('lightChange', data)
    switch (data.lightNum) {
      case 1:
        // light1.writeSync(lightValue);
        break;
      case 2:
        // light2.writeSync(lightValue);
        break;
      case 3:
        // light3.writeSync(lightValue);
        break;
    }
  })
  socket.on('fogger', data => {
    console.log('fogger data', data)
    foggerValue = data.state;
    socket.broadcast.emit('foggerChange', data);
    switch (data.lightNum) {
      case 1:
        // fogger1.writeSync(foggerValue);
        break;
      case 2:
        // fogger2.writeSync(foggerValue);
        break;
      case 3:
        // fogger3.writeSync(foggerValue);
        break;
    }
  })
})