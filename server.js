/*
Demonstration of a bar graph in d3, which then changes dynamically with animated transition 
when new data is pushed from the server.  Uses socket.io websockets.  Also uses node and
the node 'watch' module which watches the directory on the server for new / modified data file.
*/

var http = require("http");
var url = require('url');
var fs = require('fs');
var io = require('socket.io');
var watch = require('watch');
var dataDirectory = '/vagrant/data/metistream/web_apps/viz2/watch_dir';
var d3DataFileName = 'd3DataFile';
var d3DataFileFQN = dataDirectory + '/' + d3DataFileName;
var dimpleDataFileName = 'dimpleDataFile';
var dimpleDataFileFQN = dataDirectory + '/' + dimpleDataFileName;
var highchartsDataFileName = 'highchartsData';
var highchartsDataFileFQN = dataDirectory + '/' + highchartsDataFileName;

var server = http.createServer(function(request, response){
    console.log('Connection');
    var path = url.parse(request.url).pathname;
    switch(path){

        case '/':
            processIt(response, 200, {'Content-Type': 'text/html'}, "hi, you requested the root");
            break;

        case '/socket.html':
            var fullpath = __dirname + path;
            fs.readFile(fullpath, function(error, data){
                if (error){
                    processIt(response, 404, '', 'error reading socket.html file');
                }
                else {
                  processIt(response, 200, {'Content-Type': 'text/html'}, data);
                }
            });
            break;

        case '/bootstrap.html':
            var fullpath = __dirname + path;
            fs.readFile(fullpath, function(error, data){
                if (error){
                    processIt(response, 404, '', 'error reading socket.html file');
                }
                else {
                  processIt(response, 200, {'Content-Type': 'text/html'}, data);
                }
            });
            break;

        default:
            processIt(response, 404, '', "file doesn't exist - 404");
            break;
    }
});

function processIt(response, responseCode, contentType, data) {
  response.writeHead(responseCode, contentType);
  response.write(data);
  response.end();
}

server.listen(9090);

var server_io = io.listen(server);

server_io.sockets.on('connection', function(socket){
    setInterval(function(){
        socket.emit('date', {'date': new Date()});
    }, 5000);
});


watch.createMonitor(dataDirectory, function (monitor) {
  monitor.files[d3DataFileFQN, dimpleDataFileFQN] 
      monitor.on("changed", function (f, curr, prev) {
      server_io.sockets.emit('msg', 'a file changed on the server!' );

      switch(getFilename(f))
        {
          case d3DataFileName:
            emitFileData(server_io, 'd3data', d3DataFileFQN);
            break;
          case dimpleDataFileName:
            emitFileData(server_io, 'dimpleData', dimpleDataFileFQN);
            break;
          case highchartsDataFileName:
            emitFileData(server_io, 'highchartsData', highchartsDataFileFQN);
            break;


          default:
            console.log("MY WARN: case statement default");
        }
      })
  })

function emitFileData(sio, channel, fileName) {
  fs.readFile(fileName, 'utf8', function(error, data) {  
    sio.sockets.emit(channel, data);
  });
}

function getFilename(s) {
  return s.replace(/^.*[\\\/]/, '')
}


