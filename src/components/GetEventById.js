import React, { Component } from 'react'
import Event from './Event';
import EventsList from './EventsList';
import PropTypes from 'prop-types';
import '../App.css';

class GetEventById extends Component {
    state = {
        id:''
      }
    
    //   onSubmit =(e)=> {}
    
    //   onChange =(e)=> {};

    render() {
        return(
        <form  style={{display: 'flex'}}>
        <input 
        type="text" 
        name="title" 
        style={{flex: '10', padding: '5px'}}
        placeholder="Event Id" 
        value={this.state.id} 
        // onChange={this.onChange}
        />
        <input type="submit" value="Submit" className="btn" style={{flex: '1'}}
     />
     </form>
     )

// return this.props.eventsList.filter(event => event.id === 3)






    
  }
}

// PropTypes
EventsList.propTypes= {
    eventsList: PropTypes.array.isRequired
}


export default GetEventById