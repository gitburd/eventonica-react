const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
// const request = require('request-promise');
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

// Modify your express server to serve static files by adding this block to your express server:
if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "../client/build")));
    // Handle React routing, return all requests to React app
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    });
  }
  

// calling my server to get info from my database
// when u get a request for this end point run this function 
app.get('/', db.getEvents);
app.get('/events', db.getEvents);
app.get('/events/:id', db.getEventById);
app.post('/events', db.createEvent);
app.put('/events/:id', db.updateEvent);
app.delete('/events/:id', db.deleteEvent)



app.set('port', process.env.PORT || 3000);
console.log('API listening!')
// app.listen(3000, () => console.log('Quote API listening on port 3000!'));