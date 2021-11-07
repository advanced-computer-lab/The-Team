import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function UpdateFlight(props) {
  const [From, setFrom] = useState('');
  const [To, setTo] = useState('');
  const [Flight_date, setFlight_date] = useState('');
  const [Economy_seats, setEconomy_seats] = useState('');
  const [Business_seats, setBusiness_seats] = useState('');
  const [First_seats, setFirst_seats] = useState('');
  
  const { state } = useLocation();
  const {id} = state 

  const onChangeFrom = (e) => {
    setFrom(e.target.value);
  }

  const onChangeTo = (e) => {
    setTo(e.target.value);
  }

  const onChangeFlight_date = (e) => {
    setFlight_date(e.target.value);
  }

  const onChangeEconomy_seats = (e) => {
    setEconomy_seats(e.target.value);
  }

  const onChangeBusiness_seats = (e) => {
    setBusiness_seats(e.target.value);
  }

  const onChangeFirst_seats = (e) => {
    setFirst_seats(e.target.value);
  }




  const onSubmit = e => {
    e.preventDefault();

    const data = {
      id: id,
      From: From,
      To: To,
      Flight_date: Flight_date,
      Economy_seats: Economy_seats,
      Business_seats: Business_seats,
      First_seats: First_seats
    };
    console.log(data)

    axios
      .patch('http://localhost:5000/flights/update/', data)
      .then(res => {
        alert("Flight updated successfully");
        window.location.reload();
      })
      .catch(err => {
        console.log("Error in UpdateFlight!" + err);
      })
  };


  return (
    <div className="UpdateFlight">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Edit Flight</h1>
            <p className="lead text-center">
              Update Flight's Info
            </p>
          </div>
        </div>

        <div className="col-md-8 m-auto">
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor="title">From</label>
              <input
                type='text'
                placeholder='From'
                name='From'
                className='form-control'
                value={From}
                onChange={onChangeFrom}
              />
            </div>

            <div className='form-group'>
              <label htmlFor="isbn">To</label>
              <input
                type='text'
                placeholder='To'
                name='isbn'
                className='form-control'
                value={To}
                onChange={onChangeTo}
              />
            </div>

            <div className='form-group'>
              <label htmlFor="author">Flight date</label>
              <input
                type='text'
                placeholder='Flight_date'
                name='author'
                className='form-control'
                value={Flight_date}
                onChange={onChangeFlight_date}
              />
            </div>

            <div className='form-group'>
              <label htmlFor="description">Economy Seats</label>
              <input
                type='text'
                placeholder='Economy seats'
                name='description'
                className='form-control'
                value={Economy_seats}
                onChange={onChangeEconomy_seats}
              />
            </div>

            <div className='form-group'>
              <label htmlFor="published_date">Business_seats</label>
              <input
                type='text'
                placeholder='business seats'
                name='published_date'
                className='form-control'
                value={Business_seats}
                onChange={onChangeBusiness_seats}
              />
            </div>
            <div className='form-group'>
              <label htmlFor="publisher">First seats</label>
              <input
                type='text'
                placeholder='first seats'
                name='publisher'
                className='form-control'
                value={First_seats}
                onChange={onChangeFirst_seats}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Flight</button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default UpdateFlight;