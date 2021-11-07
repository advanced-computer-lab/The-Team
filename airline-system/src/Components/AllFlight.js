import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios';

const Flight = props => (
  <tr>
    <td>{props.flight.From}</td>
    <td>{props.flight.To}</td>
    <td>{props.flight.Flight_date}</td>
    <td>{props.flight.Economy_seats}</td>
    <td>{props.flight.Business_seats}</td>
    <td>{props.flight.First_seats}</td>
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

const handleDeleteFlight = (id) => {
  axios.delete('http://localhost:5000/flights/' + id + '/delete')
    .then();
}

class AllFlight extends Component {
  
  constructor(props) {
    super(props);

    //this.deleteFlight = this.deleteFlight.bind(this)

    this.state = { flights: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/flights/')
      .then(response => {
        this.setState({ flights: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteFlight(id) {
    axios.delete('http://localhost:5000/flights/delete/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      flights: this.state.flights.filter(el => el._id !== id)
    })
  }

  flightList() {
    return this.state.flights.map(currentflight => {
      return <Flight flight={currentflight} key={currentflight._id} />;
    })
  }



  render() {
    return (
      <div>
        <h3>Logged Flights</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Flight date</th>
              <th>Economy</th>
              <th>Business class</th>
              <th>First class</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.flightList()}</tbody>
        </table>
      </div>
    );
  };
}

export default AllFlight;