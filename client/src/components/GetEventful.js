import React, { Component } from 'react';
// import Event from './components/Event';
import Event from './Event';
import PropTypes from 'prop-types';
import '../App.css';


export class GetEventful extends Component {
    state = {
        keyWords:'',
        location:''
      }
    
      onSubmit =(e)=> {
        e.preventDefault();
        this.props.getEventful(this.state.keyWords, this.state.location);
        this.setState({keyWords: ' '});
        this.setState({location: ' '});
      }
    
      onChange =(e)=> this.setState({[e.target.name]: e.target.value});
    
      render() {
        return (
          <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
            
             <label>
               Event Keyword:
               <input 
             type="text" 
             name="keyWords" 
             style={{flex: '10', padding: '5px'}}
             placeholder="Key words" 
             value={this.state.keyWords} 
             onChange={this.onChange}
             />
             </label>
             <label>
               Location of Event:
               <input 
             type="text" 
             name="location" 
             style={{flex: '10', padding: '5px'}}
             placeholder="Event Location" 
             value={this.state.location} 
             onChange={this.onChange}
             />
             </label>
             
          
             <input type="submit" value="Submit" className="btn" style={{flex: '1'}}
          />
          </form>
          
        )
      }
    }

export default GetEventful
