import { useNavigate } from "react-router-dom";
import ReservationsTable from "./ReservationsTable";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from 'react';
import AlertDialog from "./AlertDialog";
import { Alert } from "@mui/material";
import axios from 'axios'


export default function UserCancelFlight() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [reservations, setReservations] = React.useState([]);
  const [cancelled, setCancelled] = React.useState({});
  const [confirm, setConfirm] = React.useState(false);
  const [decision, setDecision] = React.useState(false);
  const [flightidarr, setFlightidarr] = React.useState(Object);
  const [flightearr, setFlightearr] = React.useState(Object);
  const [flightbdarr, setFlightbarr] = React.useState(Object);
  const [flightfarr, setFlightfarr] = React.useState(Object);
  const [refunded, setRefunded] = React.useState(0);
  const [flightiddep, setFlightiddep] = React.useState(Object);
  const [flightedep, setFlightedep] = React.useState(Object);
  const [flightbdep, setFlightbdep] = React.useState(Object);
  const [flightfdep, setFlightfdep] = React.useState(Object);








  var sel = {};

  useEffect(() => {

    let {id}  = state;
     axios
    .get("http://localhost:5000/reservations"+id)
    .then((res)=> {
        setReservations(res.data)
  
    })
    .catch((err) => {
      console.log(err);
    });
    
  });
  let {id}  = state;

  const selected = (data) => {
    setCancelled(data)
  };

  const decided = (data) => {
    setDecision(data)
  };



  const handleChange = (event) => {
    console.log(id)
    if (cancelled !== {}) {
      setConfirm(true)
    }
      if(decision===true){

        axios
        .get()
        .then((res)=> {
          setFlightidarr(res.data)
    
      })
        .catch((err)=>{
          console.log(err)
        });

        axios
        .post("http://localhost:5000/flights/cancelledarr", selected)
        .catch((err)=>{
          console.log(err)
        });

        axios
        .post("http://localhost:5000/flights/cancelleddep", selected)
        .catch((err)=>{
          console.log(err)
        });

        axios
        .post("http://localhost:5000/users/"+id+"/cancelled", selected)
        .catch((err)=>{
          console.log(err)
        });
        


        axios
    .delete("http://localhost:5000/reservations/"+id+"/reservations/delete",selected)
    .catch((err) => {
      console.log(err);
    });

    axios
    .patch("http://localhost:5000/users/"+id+"/reservations/delete",selected)
    .catch((err) => {
      console.log(err);
    });





      }
    
  };
  return (
    <div>
      <div>{confirm && ( <AlertDialog d={decided}/> )}
      
       </div>
       <div>//print here user stuff</div>
      <ReservationsTable func={selected} rows={reservations} />
      <div>
        <Button
          variant="contained"
          onClick={handleChange}
          style={{ marginLeft: "5px" }}
        >
          Delete
        </Button>{" "}
      </div>
    </div>
  );
}
