import React, { Component } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdateFlight extends Component {
  
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
  
//   componentDidMount() {
//     // console.log("Print id: " + this.props.match.params.id);
//     axios
//       //.get('http://localhost:5000/flights/'+this.props.match.params.id)
//       .get('http://localhost:5000/flights/')
//       .then(res => {
//         // this.setState({...this.state, book: res.data})
//         this.setState({
//             From: this.state.From,
//             To: this.state.To,
//             Flight_date: this.state.Flight_date,
//             Economy_seats: this.state.Economy_seats,
//             Business_seats: this.state.Business_seats,
//             First_seats: this.state.First_seats
//         })
//       })
//       .catch(err => {
//         console.log("Error from UpdateFlight");
//       })
//   };


  

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
    const GetId = () => {
      const { state } = useLocation();
      const { id } = state; // Read values passed on state
      console.log(id);
    }
    const data = {
        From: this.state.From,
        To: this.state.To,
        Flight_date: this.state.Flight_date,
        Economy_seats: this.state.Economy_seats,
        Business_seats: this.state.Business_seats,
        First_seats: this.state.First_seats
    };

    axios
      .patch('http://localhost:5000/flights/update/'+this.state.Id, data)
      .then(res => {
        window.location.reload();
      //  this.props.history.push('/show-book/'+this.props.match.params.id);
      //this.props.history.push('/'+this.props.match.params.id);

      })
      .catch(err => {
        
        console.log("Error in UpdateFlight!"+ err);
      })
  };


  render() {
    return (
      <div className="UpdateFlight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Flights List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Flight</h1>
              <p className="lead text-center">
                  Update Flight's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
          <div className='form-group'>
              <label htmlFor="title">ID:</label>
              <input
                type='text'
                placeholder='Enter flight id here'
                name='From'
                className='form-control'
                value={this.state.Id}
                onChange={this.onChangeId}
              />
            </div>
            
            <div className='form-group'>
              <label htmlFor="title">From</label>
              <input
                type='text'
                placeholder='From'
                name='From'
                className='form-control'
                value={this.state.From}
                onChange={this.onChangeFrom}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="isbn">To</label>
              <input
                type='text'
                placeholder='To'
                name='isbn'
                className='form-control'
                value={this.state.To}
                onChange={this.onChangeTo}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="author">Flight date</label>
              <input
                type='text'
                placeholder='Flight_date'
                name='author'
                className='form-control'
                value={this.state.Flight_date}
                onChange={this.onChangeFlight_date}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="description">Economy Seats</label>
              <input
                type='text'
                placeholder='Economy seats'
                name='description'
                className='form-control'
                value={this.state.Economy_seats}
                onChange={this.onChangeEconomy_seats}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="published_date">Business_seats</label>
              <input
                type='text'
                placeholder='business seats'
                name='published_date'
                className='form-control'
                value={this.state.Business_seats}
                onChange={this.onChangeBusiness_seats}
              />
            </div>
            <div className='form-group'>
            <label htmlFor="publisher">First seats</label>
              <input
                type='text'
                placeholder='first seats'
                name='publisher'
                className='form-control'
                value={this.state.First_seats}
                onChange={this.onChangeFirst_seats}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Flight</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateFlight;