var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');

//reference fs
var fs = require('fs');

var data = fs.readFileSync('info.JSON');

var request = require('request');




app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


let accountData = fs.readFileSync('info.JSON');
let info = JSON.parse(accountData);

app.get('/', function(req, res){
	res.render('home')
	
})


app.post('/', function(req, res){

	let user = req.body.username;	
	let pass = req.body.password;
	let email = req.body.email;
	

	info[user] = {}

	console.log(user);
    
    fs.writeFileSync('info.JSON', JSON.stringify(info, null, 2), function(err){
            if (err) throw err;
            console.log('got the info')
        });
    res.redirect('/app');

});

app.get('/app', function(req, res){
	res.render('index')
	 let story = JSON.parse(body);
})

app.post('/app', function(req, res){
		let subsection = req.body.subsection;
	let url = "https://api.nytimes.com/svc/topstories/v2/.q=${results.subsection}json"
	request.get({
  url: "https://api.nytimes.com/svc/topstories/v2/q=${results.subsection}.json",
  qs: {
    'api-key': "***************************"
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









