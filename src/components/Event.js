import React, { Component } from 'react'
import PropTypes from 'prop-types';
import '../App.css';

export class Event extends Component {
    getStyle= ()=> {
        return {
        backgroundColor:'#f4f4f4',
        padding: '10px'
        }
    }
  

    
       
    render() {
    const { id, title, type, location, date} =this.props.event;
        return (
        <div style={this.getStyle()}>
        <span style={{fontWeight:'bold', fontSize:'18px', color:'purple'}} > {title} </span>
        <span>{"("}{type}{") "}</span>    
        <span style={{fontWeight:'bold'}}>{"Details: "}</span><span>{location}{", "}{date} </span> 
        
            
        </div>
    )
  }
}




// PropTypes
Event.propTypes= {
    event: PropTypes.object.isRequired
}

export default Event