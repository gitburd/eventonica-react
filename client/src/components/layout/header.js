import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
// import '../../index.css';

function Header(){
    return (
    <header >
            <h1>Even<span style={{fontWeight:"bold"}}>Tonica</span></h1>
           
        </header>
    )
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',

}






export default Header;