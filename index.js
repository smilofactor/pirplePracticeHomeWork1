
/*
 * SVM
 * Primary file for the API
 * index.js
 */


//
//Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;


//The server should respond to all requests with a string
var server = http.createServer(function(req,res) {

  //Get URL and parse it
  var parsedUrl = url.parse(req.url,true);


  //Get path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');


  //Get the query string as an object
  var queryStringObject = parsedUrl.query;
  

  //Get headers as an object
  var headers = req.headers;


  //Get the HTTP method
  var method = req.method.toLowerCase();


  //Get payload if any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data',function(data){
    buffer += decoder.write(data);
  });

  req.on('end',function(){
    buffer += decoder.end();


    //Choose handler that this request goes to
    var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    //Construct the data object to send to the handler
    var data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : buffer
    };


    //Route the request to the handler specified in the router
    chosenHandler(data,function(statusCode,payload) {
      //Use the status code called back by the handler
      //or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      

      //Use the payload called back by the handler
      //or default to and empty object
      payload = typeof(payload) == 'object' ? payload : {};


      var payLoadString = JSON.stringify(payload);

      //Return response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payLoadString);

      //Log the requested path
      console.log('Returning statusCode is: ',statusCode,payLoadString);

    });

  });



  /*SVM
   * Leaving this in to troubleshoot in the future
  //Log the request path
  console.log('\nQueryStringObject is: ',queryStringObject,
                '\ntrimmedPath is: '+trimmedPath+ 
                '\nrequest received with these headers',headers,
                '\nrequest received with this buffer',buffer,
                '\nusing this method: '+method);
  */
 

});


//Start the server, liste on port 3000
server.listen(3000,function(){
  console.log("The server is listening on port 3000");
});


//Define the handlers
var handlers = {};

//Sample handler
handlers.sample = function(data,callback) {
  //Call back an http status code, and a payload object
  callback(406,{'name' : 'sample handler'});
};


//Not found handler
handlers.notFound = function(data,callback) {
  callback(404);
};


//Define a request router
var router = {
  'sample' : handlers.sample
  
};


