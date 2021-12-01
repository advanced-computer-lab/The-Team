import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Editprofile(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [Passport_number, setPassport_number] = useState('');
  const [Email, setEmail] = useState('');
  const [Home_address, setHome_address] = useState('');
  const [Country_code, setCountry_code] = useState('');
  const [Telephone_number, setTelephone_number] = useState('');
  
  const { state } = useLocation();
 

  



   const onSubmit = () => {
     const userDetails = {
       Username:this.state.Username,
       Password:this.state.Password,
       Fname:this.state.Fname,
       Lname:this.state.Lname,
       Passport_number:this.state.Passport_number,
       Email:this.state.Email,
       Home_address:this.state.Home_address,
       Country_code:this.state.Country_code,
       Telephone_number:this.state.Telephone_number
     };
     this.props.editUserdetails(userDetails);


  }
    

    const data = {
      Username: Username,
      Password: Password,
      Fname: Fname,
      Lname: Lname,
      Passport_number: Passport_number,
      Email: Email,
      Home_address: Home_address,
      Country_code: Country_code,
      Telephone_number: Telephone_number
    };
    console.log(data)

    axios
      .patch('http://localhost:3000/users/update', data)
      .then(res => {
        alert("User updated successfully");
        window.location.reload();
      })
      .catch(err => {
        console.log("Error in Editprofile!" + err);
      })
  


  return (
    <div className="Editprofile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
          </div>
          <div className="col-md-8 m-auto">
          <Typography variant="h3" gutterBottom component="div">
        Edit profile
      </Typography>
           
          </div>
        </div>

        <div className="col-md-8 m-auto">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group">
              
              <TextField id="outlined-basic" label="Username" variant="outlined" />
         
            </div>

            <div className="form-group">
              
              <TextField id="outlined-basic" label="Password" variant="outlined" />
            </div>

            <div className="form-group">
            <TextField id="outlined-basic" label="Fname" variant="outlined" />
            </div>

            <div className="form-group">
            <TextField id="outlined-basic" label="Lname" variant="outlined" />
            </div>

            <div className="form-group">
            <TextField id="outlined-basic" label="Passport_number" variant="outlined" />
            </div>
            <div className="form-group">
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            </div>

            <div className="form-group">
            <TextField id="outlined-basic" label="Home_address" variant="outlined" />
            </div>

            <div className="form-group">
            <TextField id="outlined-basic" label="Country_code" variant="outlined" />
            </div>

            <div className="form-group">
            <TextField id="outlined-basic" label="Telephone_number" variant="outlined" />
            </div>

            <Button
              onClick = {onSubmit}
              variant="contained">submit</Button>
            
          
               
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editprofile;