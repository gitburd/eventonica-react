import React, { Component } from 'react';
import EventsList from './components/EventsList';
// import GetEventById from './components/GetEventById';
import AddEvent from './components/AddEvent';
import Event from './components/Event';
// import About from './components/pages/About';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/header';
import './App.css';


const fetch = require('node-fetch');


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



  render() {
   
    return (
      <Router>
      <div className="App">
        <div className="container">
          <Header/>
          <AddEvent addEvent= {this.addEvent}/>   
          <Route exact path="/events" render={props =>(
          <React.Fragment>
            <EventsList eventsList= {this.state.eventsList} deleteEvent= {this.state.deleteEvent}/>    
            {/* <Event deleteEvent={this.state.deleteEvent}/> */}
          </React.Fragment>)} />
          
       
      
        
      </div>
      </div>
      </Router>
    );
  }
}

export default App;
