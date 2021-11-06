import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Flight = props => (
  <tr>
    <td>{props.flight.From}</td>
    <td>{props.flight.To}</td>
    <td>{props.flight.Flight_date}</td>
    {/* <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td> */}
  </tr>
)

 class AllFlight extends Component {
  constructor(props) {
    super(props);

    this.deleteFlight = this.deleteFlight.bind(this)

    this.state = {flights: []};
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
    axios.delete('http://localhost:5000/flights/delete/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      flights: this.state.flights.filter(el => el._id !== id)
    })
  }

  flightList() {
    return this.state.flights.map(currentflight => {
      return <Flight flight={currentflight} deleteFlight={this.deleteFlight} key={currentflight._id}/>;
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
              <th>Flight_date</th>
              <th>Economy_seats</th>
              <th>Business_seats</th>
            </tr>
          </thead>
          <tbody>
            { this.flightList() }
          </tbody>
        </table>
      </div>
    )
  }
}

export default AllFlight;