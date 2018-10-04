
/*
 * SVM
 * Primary file for the API
 * index.js
 */

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

    //Send response
    res.end('Outputting info\n');

    console.log('Request received with this payload: ',buffer);

  });



  /*SVM
   * Leaving this in to troubleshoot in the future
  //Log the request path
  console.log('\nQueryStringObject is: ',queryStringObject,
                '\nrequest received on path: '+trimmedPath+ 
                '\nrequest received with these headers',headers,
                '\nusing this method: '+method);
  */
 

});


//Start the server, liste on port 3000
server.listen(3000,function(){
  console.log("The server is listening on port 3000");
});


