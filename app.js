 const express = require('express');
 const path = require('path');
 const bodyParser = require('body-parser');

 //port
 const port = 3000 ;

 //initializing the app
 const app = new express();


 //setting the connection 
 const MongoClient = require('mongodb').MongoClient;
 const ObjectID = require('mongodb').ObjectID;
 const url = 'mongodb://localhost:27017/TaskApp';

 //connecting to mongodb

 MongoClient.connect(url, (err, database)=>{

 	if(err) throw err;
 	console.log('Connected to mongodb');
 	db = database ;
  Tasks = db.collection('tasks');

    app.listen(port,()=>{
console.log('listening on port 3000')
 })

 });

//setting up bodyparser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({etended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// setting up the view

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//The get requests

app.get('/', (req,res)=>{

Tasks.find({}).toArray((err, tasks)=>{
  if(err) {
  	console.log(err);
  }
  res.render('index', {tasks:tasks});
})

	
})

//post 
app.post('/task/add', (req, res)=>{
  //creating the task
  const task = {
text:req.body.text,
body:req.body.body  

  }
  Tasks.insert(task, (err, result)=>{
   if(err){
   	return console.log(err)
   }
   res.redirect('/');
  })
})


app.delete('/task/delete/:id', (req,res,next)=>{
  const query = {_id:ObjectID(req.params.id)};
  Tasks.deleteOne(query, (err,response)=>{
    if(err){
      return console.log(err);
    }else{
      console.log('Task deleted');
      res.send(200);
    }
  })

})