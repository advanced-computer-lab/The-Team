import React from 'react'
import { Link } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import airline  from"../Airline.jpg";
import logo  from"../logo.png";

export default function AdminPanel() {
    return (
      <div>
        
        <AppBar position="static" sx={{
    backgroundColor:"#006fa2"
}}>
  <Toolbar>
        <Button href="/home/adminpanel/create" variant="text" sx={{
        
        color:"white"
    }}>
     Create Flight
    </Button>

        <br />
        <Button href="/home/adminpanel/flights" variant="text" sx={{
          marginLeft:"20px",
        
        color:"white"
    }}>
     Flights
    </Button>
        <br />
        <Button href="/home/adminpanel/search" variant="text" sx={{
        marginLeft:"20px",
        color:"white"
    }}>
     Search 
    </Button>

    <img src={logo} alt="airplane" style={{
                width:40,
                marginLeft:"420px",
                
                padding:"23px 20px"
            }}/> 

    <Button href="/home" variant="text" sx={{
          marginLeft:"600px",
        
        color:"white"
    }}>
     Back
    </Button>
    </Toolbar>

    </AppBar>

    <h1>Hello MR.Admin</h1>
        <br />

    <img src={airline} alt="airplane" style={{

justifyContent:"center",
alignItems:"center",
width: "100%",

}}
/> 
    

      </div>
    );
}