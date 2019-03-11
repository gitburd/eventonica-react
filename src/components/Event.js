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
    const { id, title, type, location, date} = this.props.event;
        return (
        <div style={this.getStyle()}>
         <input type="checkbox" onChange={this.props.updateEvent.bind(this,this.props.event)}/>{' '}
        <span style={{fontWeight:'bold', fontSize:'18px', color:'purple'}} > {title} </span>
        <span>{"("}{type}{") "}</span>    
        <br/>
        <span style={{fontWeight:'bold'}}>{"Details: "}</span><span>{location}{", "}{date} </span> 
        <button onClick={this.props.deleteEvent.bind(this,id)}style={btnStyle}>X</button>
        
            
        </div>
    )
  }
}

// PropTypes
Event.propTypes= {
    event: PropTypes.object.isRequired
}

const btnStyle={
    background: '#ff0000',
    color:'#fff',
    border:'none',
    padding: '5px 8px',
    borderRadius: '50%',
    cursor: 'pointer',
    float:'right'
}


export default Event