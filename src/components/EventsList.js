import React, { Component } from 'react'
import Event from './Event';
import PropTypes from 'prop-types';
import '../App.css';

class EventsList extends Component {
    render() {
      console.log(this.props.eventsList);

    return this.props.eventsList.map((event)=>(
        
        <Event key={event.id} event={event}  />
    ));
    
  }
}

// PropTypes
EventsList.propTypes= {
    eventsList: PropTypes.array.isRequired
}


export default EventsList