import React, { Component } from 'react';
// import Event from './components/Event';

export class AddEvent extends Component {
    state = {
        title:'',
        type:'',
        location:'',
        date:' '
      }
    
      onSubmit =(e)=> {
        e.preventDefault();
        this.props.addEvent(this.state.title, this.state.type, this.state.location, this.state.date);
        this.setState({title: ' '});
        this.setState({type: ' '});
        this.setState({location: ' '});
        this.setState({date: ' '});
      }
    
      onChange =(e)=> this.setState({[e.target.name]: e.target.value});
    
      render() {
        return (
          <form onSubmit={this.onSubmit} className="addEventForm">
             <label>
               Name :
               <input 
             type="text" 
             name="title" 
             style={{flex: '10', padding: '5px'}}
             placeholder="Event Name" 
             value={this.state.title} 
             onChange={this.onChange}
             />
             </label>
             <label>
               Key Word : 
               <input 
             type="text" 
             name="type" 
             style={{flex: '10', padding: '5px'}}
             placeholder="Event type" 
             value={this.state.type} 
             onChange={this.onChange}
             />
             </label>
             <label>
               Location :
               <input 
             type="text" 
             name="location" 
             style={{flex: '10', padding: '5px'}}
             placeholder="Location" 
             value={this.state.location} 
             onChange={this.onChange}
             />
             </label>
             <label>
               Date :
               <input 
             type="text" 
             name="date" 
             style={{flex: '10', padding: '5px'}}
             placeholder="Event Date" 
             value={this.state.date} 
             onChange={this.onChange}
             />
             </label>
          
             <input type="submit" value="Submit" className="btn addEventForm" style={{ margin:'20px'} }
          />
          </form>
          
        )
      }
    }

export default AddEvent