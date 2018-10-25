//reference fs
var fs = require('fs');

var data = fs.readFileSync('words.json');

//parse raw data, read as JSON
var words = JSON.parse(data);
console.log(words);

console.log("server is starting");

//imports express package
var express = require('express');

//making an express app
var app = express();

var server = app.listen(3000, listening);

function listening(){
    console.log("listening")
}


app.get('/add/:word', addWord);
function addWord(request, response){
	var data = request.params; //word and score are parameters
    var word = data.word;	
    var score = Number(data.score);
    words[word] = score;
    var data = JSON.stringify(words); 
    fs.writeFile('words.json', data, finished);
        function finished(err) {
            console.log('got the word')
        } 
    var reply = {
        msg: "word has been added!"
    }
	response.send(reply)
}
   
//route for user to see all of JSON file
app.get('/all', sendAll);

////callback function to allow a user to send data and receive a response
function sendAll(request, response){
    response.send(words);
}




















