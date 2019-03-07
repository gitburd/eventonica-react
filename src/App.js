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

  // componentDidMount(){
  //   fetch("http://localhost:3000/events/byId").then(res => res.json()).then(json => this.setState({eventsList: json})).catch(function(e) {
  //   console.log(e); // “oh, no!”
  //  })
  // }


  render() {
   
    return (
      <Router>
      <div className="App">
        <div className="container">
          <Header/>
          <Route exact path="/events" render={props =>(
          <React.Fragment>
            <EventsList eventsList= {this.state.eventsList}/>    
          </React.Fragment>)} />
          {/* <Route path="events/byId" render={props =>(
          <React.Fragment>
            <GetEventById eventsList = {this.state.eventsList}/>    
          </React.Fragment>)} /> */}

        
      </div>
      </div>
      </Router>
    );
  }
}

export default App;
