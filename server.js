// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server 
// ==============================================================================

var app = express(); // Tells node that we are creating an "express" server
var PORT = process.env.PORT || 8080; // Sets an initial port. We'll use this later in our listener

// BodyParser makes it easy for our server to interpret data sent to it.
// The code below is pretty standard.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs. 
// ================================================================================

var tableArr = [
{
	customerFirst: "Steve",
	customerLast: "Freeman",
	customerNum: 9085783770,
	customerID: 1
},
{
	customerFirst: "Mike",
	customerLast: "Constanza",
	customerNum: 111111,
	customerID: 2
}
];

app.get("/", function(req, res){
	res.sendFile(path.join(__dirname, 'home.html'));
});

app.get("/tables", function(req, res){
	res.sendFile(path.join(__dirname, 'tables.html'));
});

app.post("/reserve", function(req, res){
	res.sendFile(path.join(__dirname, 'reserve.html'));
	var newTable = req.body;
	tableArr.push(req.body);
});

app.get("/api/tables", function(req, res){
	res.json(tableArr);
});

app.get("/api/tables/:id?", function(req, res){
	var id = req.params.id;
	if (id){
		for(var i = 0; i <tableArr.length; i++){
		if(tableArr[i].customerID == id){
			res.json(tableArr[i]);
		}
	}
	}
	else{
		res.json(tableArr);
	}
})

// ==============================================================================
// LISTENER
// The below code effectively "starts" our server 
// ==============================================================================

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});