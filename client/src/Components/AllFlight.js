import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios';

const Flight = props => (
  <tr>
    <td>{props.flight.From}</td>
    <td>{props.flight.To}</td>
    <td>{props.flight.Dep_date}</td>
    <td>{props.flight.Arr_date}</td>
    <td>{props.flight.Dep_time}</td>
    <td>{props.flight.Arr_time}</td>
    <td>{props.flight.Economy_seats}</td>
    <td>{props.flight.Business_seats}</td>
    <td>{props.flight.First_seats}</td>
    <td>{props.flight.First_no}</td>
    <td>{props.flight.Baggage_allowance}</td>
    <td>{props.flight.Price}</td>
    <td>{props.flight.Dep_terminal}</td>
    <td>{props.flight.Arr_terminal}</td>
    <td>{props.flight.Trip_duration}</td>






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
              <th>Dep_date</th>
              <th>Arr_date</th>
              <th>Arr_time</th>
              <th>Dep_time</th>
              <th>Economy_seats</th>
              <th>Business_seats</th>
              <th>First_seats</th>
              <th>Flight_no</th>
              <th>Baggage_allowance</th>
              <th>Price</th>
              <th>Dep_terminal</th>
              <th>Arr_terminal</th>
              <th>Trip_duration</th>
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