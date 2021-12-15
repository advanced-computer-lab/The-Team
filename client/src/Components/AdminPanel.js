import React from 'react'
import { Link } from 'react-router-dom';

export default function AdminPanel() {
    return (
      <div>
        <h1>Admin Panel</h1>
        <br />
        <Link
          to="/home/adminpanel/create"
          className="btn btn-outline-warning float-left"
        >
          I Want to Create a New Flight
        </Link>

        <br />
        <Link
          to="/home/adminpanel/flights"
          className="btn btn-outline-warning float-left"
        >
          I want to see a list of all of the flights
        </Link>
        <br />
        <Link
          to="/home/adminpanel/search"
          className="btn btn-outline-warning float-left"
        >
          I Want to Search for a Flight
        </Link>

        <br />
        <br />
        <Link to="/home" className="btn btn-outline-warning float-left">
          Go Back
        </Link>
      </div>
    );
}