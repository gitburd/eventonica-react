import React, { Component } from 'react';
import EventsList from './components/EventsList';
// import GetEventById from './components/GetEventById';
import AddEvent from './components/AddEvent';
import UpdateEvent from './components/UpdateEvent';
import Update from './components/Update';
import Event from './components/Event';
import ById from './components/ById';
import GetEventful from './components/GetEventful';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/header';
import './App.css';


const http = require('http');
const eventfulKey = require("./keys.js").eventful;
const eventful = require('eventful-node');
// const client = new eventful.Client(eventfulKey);
const fetch = require('node-fetch');
const axios = require('axios');


class App extends Component {
  state ={ eventsList:[] }

  componentDidMount(){
    fetch("http://localhost:3000/events").then(res => res.json()).then(json => this.setState({eventsList: json})).catch(function(e) {
    console.log(e); // “oh, no!”
   })
  }

// Add event

addEvent = (title, type, location, date)=>{
  const newEvent={
    id: `${100+ this.state.eventsList.length}`,
    title,
    type,
    location,
    date
  }

  this.setState({ eventsList: [...this.state.eventsList, newEvent]});

  fetch("http://localhost:3000/events", {
    method: 'post',
    body:    JSON.stringify(newEvent),
    headers: { 'Content-Type': 'application/json'}
    })
    .catch(function(e) {console.log(e)})

}

// update event
updateEvent = (id)=>{

  const body ={
    title: `changed`,
    type: `changed`,
    location:`changed`,
    date:`changed`
  }
  fetch(`http://localhost:3000/events/${id}`, {
    method: 'put',
    body:    JSON.stringify(body),
    headers: { 'Content-Type': 'application/json'}
})
.catch(function(e) {console.log(e)})
  this.setState({eventsList: this.state.eventsList.map(event=>{
    if(event.id == id){
      event.title = "changed";
      event.type="changed";
      event.location="changed";
      event.date="changed";
    }
    return event;
  })})
}

update = (id,title,type,location,date)=>{

  const body ={
    title,
    type,
    location,
    date
  }
  fetch(`http://localhost:3000/events/${id}`, {
    method: 'put',
    body:    JSON.stringify(body),
    headers: { 'Content-Type': 'application/json'}
})
.catch(function(e) {console.log(e)})
  this.setState({eventsList: this.state.eventsList.map(event=>{
    if(event.id == id){
      event.title = title;
      event.type = type;
      event.location = location;
      event.date = date;
    }
    return event;
  })})
}





// delete event
deleteEvent = (id)=>{
  this.setState({eventsList:[...this.state.eventsList.filter(event=>event.id!==id)]})
  fetch(`http://localhost:3000/events/${id}`, {
    method: 'delete',
    // body:    JSON.stringify(body),
    headers: { 'Content-Type': 'application/json'}
})
.then(function(ducks) {console.log("it worked!")})
.catch(function(e) {console.log(e)})

}

// by id
byId =(id)=>{
  fetch(`http://localhost:3000/events/${id}`)
  .then(res => res.json())
  .then(json => this.setState({eventsList: json}))
  .catch(function(e) {console.log(e); // “oh, no!”
})
};

// get events from eventful
getEventful =(keyWords,location)=>{

axios.defaults.headers.common['Authorization'] = eventfulKey;  
axios.get(`http://api.eventful.com/events?q=${keyWords}&l=${location}`, {mode: "no-cors"})
.then(response => console.log(response))
.catch(function(e) {console.log(e)})
}

  
  // client is not defined error\\\\\

  // client.searchEvents({
  //   keywords: keyWords,
  //   location: location,
    // date: "Next Week"
  // }, function(err, data){
  //    if(err){
  //      return console.error(err);
  //    }
  //    let resultEvents = data.search.events.event;

  //    console.log(resultEvents);
  
  //   })

  ///CORB error- not cors \\\\\
  // fetch(`http://api.eventful.com/events?q=${keyWords}&l=${location}& oauth_consumer_key=${eventfulKey}`
  // , {
  //   method: "get",
  //   mode: "no-cors",
  //   headers: { "Content-Type": "application/json"}
  //   // body: JSON.stringify(data)
  // })
  //   .then(response => response.json())
  //   .then(data=>console.log(data))
  //   .catch(function(e) {console.log(e)})
  //   }

  
     
// post to my api once i get it working
// const body = { 
// title:`${resultEvents[0].title}`,
// type:`${keyWords}`,
// location:`${resultEvents[0].location}`,
// date:`${resultEvents[0].start_time}`
// }
// console.log(body, JSON.stringify(body))
// fetch("http://localhost:3000/events", {
//       method: 'post',
//       body:    JSON.stringify(body),
//       headers: { 'Content-Type': 'application/json'}
//   })
// .catch(function(e) {console.log(e)});






  render() {
   
    return (
      <Router>
      <div className="App">
        <div className="container">
          <Header/> 
          <Route exact path="/events" render={props =>(
          <React.Fragment>
            <h2 style={{"padding":"20px"}}> Add Event</h2>
            <AddEvent addEvent={this.addEvent}/>
            <div style={{"padding":"20px"}}>
            <h2>List of Events</h2>
            <EventsList  eventsList= {this.state.eventsList} updateEvent= {this.updateEvent} deleteEvent={this.deleteEvent}/>    
            
            <h2>Update Event</h2>
            <Update eventsList={this.eventsList} update= {this.update}/>
            </div>
          </React.Fragment>)} />
    

          <Route path="/events/byid" render={props =>(
          <React.Fragment>
            <h2>List of Events</h2>
            <EventsList  eventsList= {this.state.eventsList} updateEvent= {this.updateEvent} deleteEvent={this.deleteEvent}/>    
           <h2> By Id </h2>
           <ById eventsList={this.eventsList} byId= {this.byId}/>
           <h2>Update Event</h2>
            <Update eventsList={this.eventsList} update= {this.updateEvent}/>
           </React.Fragment>)} />


           <Route path="/events/geteventful" render={props =>(
          <React.Fragment>
           <h2> Get Events from Eventful API </h2>
           <GetEventful getEventful={this.getEventful}/>
           </React.Fragment>)} />


  
        
      </div>
      </div>
      </Router>
    );
  }
}

export default App;
