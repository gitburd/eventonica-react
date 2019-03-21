const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
// const request = require('request-promise');
var path= require('path')
const app = express();


const http= require('http')
// const inquirer = require('inquirer');

const db = require('./queries');
const port = 3000;

// express midware
app.use(express.json());
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))


  

// calling my server to get info from my database
// when u get a request for this end point run this function 
app.get('/api', db.getEvents);
app.get('/api/events', db.getEvents);
app.get('/api/events/:id', db.getEventById);
app.post('/api/events', db.createEvent);
app.put('/api/events/:id', db.updateEvent);
app.delete('/api/events/:id', db.deleteEvent)


// Modify your express server to serve static files by adding this block to your express server:
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}


app.set('port', process.env.PORT || 3000);
console.log('API listening!')
app.listen(process.env.PORT || 3000, () => console.log('API listening!'));
