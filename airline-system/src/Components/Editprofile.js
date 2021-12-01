import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

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
 

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onChangeFname = (e) => {
    setFname(e.target.value);
  }

  const onChangeLname = (e) => {
    setLname(e.target.value);
  }

  const onChangePassport_number = (e) => {
    setPassport_number(e.target.value);
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  
  const onChangeHome_address = (e) => {
    setHome_address(e.target.value);
  }

  const onCountry_code = (e) => {
    setCountry_code(e.target.value);
  }

  const onChangeTelephone_number = (e) => {
    setTelephone_number(e.target.value);
  }



  const onSubmit = e => {
    e.preventDefault();

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
  };


  return (
    <div className="Editprofile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Profile</h1>
            <p className="lead text-center">Edit profile Info</p>
          </div>
        </div>

        <div className="col-md-8 m-auto">
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="Username">Username</label>
              <input
                type="text"
                placeholder="Username"
                name="Username"
                className="form-control"
                value={Username}
                onChange={onChangeUsername}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Passowrd">Password</label>
              <input
                type="text"
                placeholder="Password"
                name="Password"
                className="form-control"
                value={Password}
                onChange={onChangePassword}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Fname">Fname</label>
              <input
                type="text"
                name="Fname"
                className="form-control"
                value={Fname}
                onChange={onChangeFname}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Lname">Lname</label>
              <input
                type="text"
                placeholder="Lname"
                name="Lname"
                className="form-control"
                value={Lname}
                onChange={onChangeLname}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Passport_number">Passport_number</label>
              <input
                type="text"
                placeholder="Passport_number"
                name="Passport_number"
                className="form-control"
                value={Passport_number}
                onChange={onChangePassport_number}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                placeholder="Email"
                name="Email"
                className="form-control"
                value={Email}
                onChange={onChangeEmail}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Home_address">Home_address</label>
              <input
                type="text"
                placeholder="Home_address"
                name="Home_address"
                className="form-control"
                value={Home_address}
                onChange={onChangeHome_address}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Country_code">Country_code</label>
              <input
                type="text"
                placeholder="Country_code"
                name="Country_code"
                className="form-control"
                value={Country_code}
                onChange={onCountry_code}
              />
            </div>

            <div className="form-group">
              <label htmlFor="Telephone_number">Telephone_number</label>
              <input
                type="text"
                placeholder="Telephone_number"
                name="Telephone_number"
                className="form-control"
                value={Telephone_number}
                onChange={onChangeTelephone_number}
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-info btn-lg btn-block"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editprofile;