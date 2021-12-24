import React from 'react'
import { Link } from 'react-router-dom';
import airline  from"../Airline.jpg";
import Button from "@mui/material/Button";
import logo  from"../logo.png";
import AppBar from "@mui/material/AppBar";
import { useNavigate } from 'react-router-dom';
import Toolbar from "@mui/material/Toolbar";


    


export default function HomePage() {
    return (
        <div>

<AppBar position="static" sx={{
    backgroundColor:"#006fa2"
}}>
    <Toolbar>
<Button variant="text" sx={{
    color:"white"
    
}} >
about
    </Button>

    <Button variant="text" sx={{
   marginLeft:"20px",
   color:"white"
}}>
     sign in
    </Button>


    <Button  variant="text" sx={{
   marginLeft:"20px",
   color:"white"
}}>
    sign up
    
    </Button>

    <img src={logo} alt="airplane" style={{
                width:40,
                marginLeft:"500px",
                
                padding:"23px 20px"
            }}/> 
     

    <Button href="/home/adminpanel" variant="text" sx={{
        marginLeft:"540px",
        color:"white"
    }}>
     Admin Log in
    </Button>
    </Toolbar>
</AppBar>

<h1 style={{
            

            fontSize:25
        }}>Welcome to Kabab Air

        
        </h1>

        
          
        <view>

            <img src={airline} alt="airplane" style={{

                justifyContent:"center",
                alignItems:"center",
                width: "100%",
                
            }}
            /> 
            

</view>
             

            <br/>
            
            
                   
        </div>

    )
} 
