import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';



class CreateFlight extends Component {
  constructor(props) {
    super(props);



    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
    this.onChangeFlight_date = this.onChangeFlight_date.bind(this);
    this.onChangeEconomy_seats = this.onChangeEconomy_seats.bind(this);
    this.onChangeBusiness_seats = this.onChangeBusiness_seats.bind(this);
    this.onChangeFirst_seats = this.onChangeFirst_seats.bind(this);
    
    
    
    
    this.onSubmit = this.onSubmit.bind(this);



    this.state = {
      From: '',
      To:'',
      Flight_date:'',
      Economy_seats:'',
      Business_seats:'',
      First_seats:''
    };
  }



  onChangeFrom(e) {
    this.setState({
      From: e.target.value
    })
  }

  onChangeTo(e) {
    this.setState({
      To: e.target.value
    })
  }

  onChangeFlight_date(e) {
    this.setState({
      Flight_date: e.target.value
    })
  }

  onChangeEconomy_seats(e) {
    this.setState({
      Economy_seats: e.target.value
    })
  }

  onChangeBusiness_seats(e) {
    this.setState({
      Business_seats: e.target.value
    })
  }

  onChangeFirst_seats(e) {
    this.setState({
      First_seats: e.target.value
    })
  }




  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
    From: this.state.From,
      To: this.state.To,
      Flight_date: this.state.Flight_date,
      Economy_seats: this.state.Economy_seats,
      Business_seats: this.state.Business_seats,
      First_seats: this.state.First_seats
    };

    axios
      .post('http://localhost:5000/flights/add', data)
      .then(res => {
        this.setState({
          From: '',
          To:'',
          Flight_date:'',
          Economy_seats:'',
          Business_seats:'',
          First_seats:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
          console.log(data)
        console.log("Error in CreateFlight!" + err);
      })
  };

  render() {
    return (
    <div>
      <h3>Create New Flight Log</h3>
      <form onSubmit={this.onSubmit}>

      <div className="form-group"> 
          <label>From: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.From}
              onChange={this.onChangeFrom}
              />
        </div>


        <div className="form-group"> 
          <label>To: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.To}
              onChange={this.onChangeTo}
              />
        </div>


        <div className="form-group">
          <label>Flight Time:</label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.Flight_date}
              onChange={this.onChangeFlight_date}
              />
        </div>

        <div className="form-group">
          <label>Number of Economy Seats</label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.Economy_seats}
              onChange={this.onChangeEconomy_seats}
              />
          
        </div>

        <div className="form-group">
          <label>Number of Business Seats</label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.Business_seats}
              onChange={this.onChangeBusiness_seats}
              />
          
        </div>

        <div className="form-group">
          <label>Number of First Seats</label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.First_seats}
              onChange={this.onChangeFirst_seats}
              />
          
        </div>

        <div className="form-group">
          <input type="submit" value="Create Flight Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}

export default CreateFlight;