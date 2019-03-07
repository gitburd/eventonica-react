import React from 'react';
import {Link} from 'react-router-dom';
// import '../../App.css';

function Header(){
    return (
        <header style={headerStyle}>
            <h1>EvenTonica</h1>
           
        </header>
    )
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

const headerStyle={
    background: '#333',
    color:'#fff',
    textAlign:'center',
    padding:'10px'
}

export default Header;