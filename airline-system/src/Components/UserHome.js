import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios';


const userFlights = props => (
    <tr>
      <td>{props.user.Username}</td>
      <td>{props.user.Password}</td>
      <td>{props.user.Email}</td>
      <td>{props.user.Passport_number}</td>
      <td>{props.user.Fname}</td>
      <td>{props.user.Lname}</td>
      <td>{props.user.Home_address}</td>
      <td>{props.user.Country_code}</td>
      <td>{props.user.Telephone_Number}</td>
      <td>{props.user.Flights}</td>

      <td>
      <Link
        to='/home/cancelf'
        state={{ fli: props.user.Flights }}
      >
        Update
      </Link>
    </td>


      <td>
        <Link
          to='/home/adminpanel/flights/update'
          state={{ id: props.flight._id }}
        >
          Update
        </Link>
      </td>
      <td><button
        onClick={e =>
          window.confirm("Are you sure you wish to delete this item?") &&
          handleDeleteFlight(props.flight._id)
        }
      >
        Delete
      </button>
      </td>
    </tr>
  );