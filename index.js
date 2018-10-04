
/*
 * SVM
 * Primary file for the API
 * index.js
 */

//Dependencies
var http = require('http');
var url = require('url');


//The server should respond to all requests with a string
var server = http.createServer(function(req,res) {

  //Get URL and parse it
  var parsedUrl = url.parse(req.url,true);

  //Get path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');
  
 
  //Send response
  res.end('Outputting info\n');


  //Log the request path
  console.log('Request received on path: '+trimmedPath);


});


//Start the server, liste on port 3000
server.listen(3000,function(){
  console.log("The server is listening on port 3000");
});


