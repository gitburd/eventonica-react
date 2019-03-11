import React, { Component } from 'react'
import Event from './Event';
import PropTypes from 'prop-types';
import '../App.css';

class ResultEvents extends Component {
    render() {
    //   console.log(this.props.resultEvents);

    return this.props.resultEvents.map((event)=>(
        
        <Event key={event.id} event={event}  updateEvent={this.props.updateEvent} deleteEvent={this.props.deleteEvent}/>
    ));
    
  }
}

// PropTypes
ResultEvents.propTypes= {
    resultEvents: PropTypes.array.isRequired
}


export default ResultEvents