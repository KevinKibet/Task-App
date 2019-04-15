 const express = require('express');
 const path = require('path');
 const bodyParser = require('body-parser');

 //initializing the app
 const app = new express();

//setting up bodyparser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({etended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// setting up the view

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//The get requests

app.get('/', (req,res)=>{
	res.render('index');
})

 app.listen(3000,()=>{
console.log('listening on port 3000')
 })