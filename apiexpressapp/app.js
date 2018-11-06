var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');

var request = require('request');




app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index')
	 let story = JSON.parse(body);
})


app.post('/', function(req, res){
	let subsection = req.body.subsection;
	let url = "https://api.nytimes.com/svc/topstories/v2/.q=${results.subsection}json"
	request.get({
  url: "https://api.nytimes.com/svc/topstories/v2/q=${results.subsection}.json",
  qs: {
    'api-key': ""
  },
}, function(err, response, body) {
  //let story = JSON.parse(body);
  console.log(body);
})
	
request(url, function(err, response, body){
		if(err){
			res.render('index', {story: null, error: 'Error, try again'});
		} else {
			let story = JSON.parse(body)
			console.log(story);
			if(story.main == undefined){
				res.render('index', {story: null, error: 'Error, try again'})
			} else {
				let storyText =` ${results.title} : ${results.url}`;
				res.render('index', {story: storyText, error: null});
			}
		}
	});

});





app.listen(3000, function(){
	console.log('app is running of port 3000!')
})









