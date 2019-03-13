import React, { Component } from 'react';
// import { Nav,  Navbar,Button } from 'react-bootstrap';
import EventsList from './components/EventsList';
import ResultEvents from './components/ResultEvents';
// import GetEventById from './components/GetEventById';
import AddEvent from './components/AddEvent';
import SelectEvent from './components/SelectEvent';
import Update from './components/Update';
import Event from './components/Event';
import ById from './components/ById';
import GetEventful from './components/GetEventful';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './components/layout/header';
import './App.css';
import './index.css';


const http = require('http');
const eventfulKey = 'BrG5fsLbNhxT2b8w';
const eventful = require('eventful-node');
// const client = new eventful.Client(eventfulKey);
const fetch = require('node-fetch');
const axios = require('axios');


class App extends Component {
  state ={ 
    eventsList:[],
    resultEvents:[],
    selectedEvent:null
  }


  




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

// select event
selectEvent = (event)=>{
  this.setState({selectedEvent:event})
}

// update 
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
  let proxyUrl = "https://cors-anywhere.herokuapp.com/"
  let targetUrl =
    `http://api.eventful.com/json/events/search?app_key=${eventfulKey}&q=${keyWords}&l=${location}`
  fetch(proxyUrl + targetUrl)
    .then(res => res.json())
    .then(json => {
      let firstFive =[]
      for(let i=0; i<5;i++){
      console.log(`${json.events.event[i].title}, ${json.events.event[i].venue_name}, ${json.events.event[i].city_name}, ${json.events.event[i].start_time} `)

      let body =   
      {
      title: `${json.events.event[i].title}`, 
      type:keyWords,
      location: `${json.events.event[i].venue_name}, ${json.events.event[i].city_name}`,
      date: `${json.events.event[i].start_time}`
      
      
    }
    // this.state.eventsList[i]=body
    firstFive.push(body)
    
    // this.state.eventsList.push(body)
  }
  this.setState({ eventsList:[...this.state.eventsList,...firstFive], resultEvents:firstFive } )
  


    }).then (res=>{

      for(let i=0;i<this.state.resultEvents.length;i++){
       let  body = { 
          title:`${this.state.resultEvents[i].title}`,
          type:`${keyWords}`,
          location:`${this.state.resultEvents[i].location}`,
          date:`${this.state.resultEvents[i].start_time}`
          }
          console.log(body, JSON.stringify(body))
          fetch("http://localhost:3000/events", {
                method: 'post',
                body:    JSON.stringify(body),
                headers: { 'Content-Type': 'application/json'}
                // mode:'no-cors'
            })
          .catch(function(e) {console.log(e)});
      }
       
    })
    
    .catch(function(e) {console.log(e) })

    
  }


  render() {
   
    return (
      <Router>
      <div className="App">
    
        <div className="container" >

        <Route exact path="/" render={props =>(
          <React.Fragment>
              <div className="App-header">
        <Header/> 
           
            <ul className="nav" >
              <li><Link to ="/events/" >List Events</Link></li>  
              <li><Link to ="/events/add" >Add Events</Link></li> 
              <li><Link to ="/events/update" >Update Events</Link></li> 
              <li><Link to ="/events/geteventful" >Use Eventful API</Link></li> 
            </ul>
   
            </div>

           
            <div className="addEvent" >
            <h2 > Add Event</h2>
            <AddEvent className="addEventForm" addEvent={this.addEvent}/>
            </div>
            
            <h2>List of Events</h2>
            <EventsList  eventsList= {this.state.eventsList} selectEvent= {this.selectEvent} deleteEvent={this.deleteEvent}/>    
            
            <div className="updateEvent" >
            <h2 >Update Event</h2>
            <Update  eventsList={this.eventsList} update= {this.update} event={this.state.selectedEvent}/>
            </div>        
            
          </React.Fragment>)} />

          <Route  exact path="/events/" render={props =>(
          <React.Fragment>
            <div className="header">
             <ul className="nav" >
              <li ><Link to="/">Even<span style={{fontWeight:'bold'}}>Tonica</span></Link></li>
              <li><Link to ="/events/" >List Events</Link></li>  
              <li><Link to ="/events/add" >Add</Link></li> 
              <li><Link to ="/events/update" >Update</Link></li> 
              <li><Link to ="/events/geteventful" >Eventful API</Link></li> 
            </ul>
            </div>
            
            <div style={{"padding":"20px 0px"}} >
            
            <h2>List of Events</h2>
            <EventsList  eventsList= {this.state.eventsList} selectEvent= {this.selectEvent} deleteEvent={this.deleteEvent}/>    
            </div>
             
            
          </React.Fragment>)} />

          <Route exact path="/events/add" render={props =>(
          <React.Fragment>
            <div className="header">
             <ul className="nav" >
              <li ><Link to="/">Even<span style={{fontWeight:'bold'}}>Tonica</span></Link></li>
              <li><Link to ="/events/" >List Events</Link></li>  
              <li><Link to ="/events/add" >Add</Link></li> 
              <li><Link to ="/events/update" >Update</Link></li> 
              <li><Link to ="/events/geteventful" >Eventful API</Link></li> 
            </ul>
            </div>
          
            <div className="addEvent" >
            <h2 > Add Event</h2>
            <AddEvent className="addEventForm" addEvent={this.addEvent}/>
            </div>

            <div style={{"padding":"20px 0px"}} >
            
            <h2>List of Events</h2>
            <EventsList  eventsList= {this.state.eventsList} selectEvent= {this.selectEvent} deleteEvent={this.deleteEvent}/>    
            </div>
            
          </React.Fragment>)} />

          <Route exact path="/events/update" render={props =>(
          <React.Fragment>
             <div className="header">
             <ul className="nav" >
              <li ><Link to="/">Even<span style={{fontWeight:'bold'}}>Tonica</span></Link></li>
              <li><Link to ="/events/">List Events</Link></li>  
              <li><Link to ="/events/add" >Add</Link></li> 
              <li><Link to ="/events/update" >Update</Link></li> 
              <li><Link to ="/events/geteventful" >Eventful API</Link></li> 
            </ul>
            </div>
          
            <div className="updateEvent" >
            <h2 >Update Event</h2>
            
            <Update  eventsList={this.eventsList} update= {this.update} event={this.state.selectedEvent}/>
            </div>   

            <div style={{"padding":"20px 0px"}} >
            
            
            <div style={{color:"#01478e", borderTopStyle:"dashed",borderBottomStyle:"dashed"}}>

            <p>Click the <b>box on the left </b> side to <b>UPADTE</b> an event.</p>
            <p>Click the <b>circle on the Right</b> side to <b>DELETE</b> an event.</p>
            </div>
            <h2>List of Events</h2>
            <EventsList  eventsList= {this.state.eventsList} selectEvent= {this.selectEvent} deleteEvent={this.deleteEvent}/>    
            </div>
            
             
          </React.Fragment>)} />


          <Route exact path="/events/geteventful" render={props =>(
          <React.Fragment>
             <div className="header">
             <ul className="nav" >
              <li ><Link to="/">Even<span style={{fontWeight:'bold'}}>Tonica</span></Link></li>
              <li><Link to ="/events/" >List Events</Link></li>  
              <li><Link to ="/events/add" >Add</Link></li> 
              <li><Link to ="/events/update" >Update</Link></li> 
              <li><Link to ="/events/geteventful" >Eventful API</Link></li> 
            </ul>
            </div>
            
            <div className="addEvent" style={{padding:'0px'}} >
           <h2  > Get Events from the Eventful API </h2>
           <GetEventful className="addEventForm"  getEventful={this.getEventful} />
           </div>
           <ResultEvents resultEvents= {this.state.resultEvents} selectEvent= {this.selectEvent} deleteEvent={this.deleteEvent}/>
           
          
             
          </React.Fragment>)} />
  
        
      </div>
      </div>
      </Router>
    );
  }
}

export default App;
