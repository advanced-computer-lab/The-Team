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
  var [confirm, setConfirm] = React.useState(false);
  var [decision, setDecision] = React.useState(false);
  var dec=false;



  useEffect(() => {

    let {id}  = state;
     axios
    .get("http://localhost:5000/reservations/"+id)
    .then((res)=> {
        setReservations(res.data)
        console.log(reservations)
  
    })
    .catch((err) => {
      console.log(err);
    });
    
  },[reservations.length]);
  let {id}  = state;

  const selected = (data) => {
    setCancelled(data)
  };

  const decided = (data) => {
    if(data===true){

      axios
      .patch("http://localhost:5000/flights/cancelledarr", cancelled)
      .catch((err)=>{
        console.log(err)
      });

      axios
      .patch("http://localhost:5000/flights/cancelleddep", cancelled)
      .catch((err)=>{
        console.log(err)
      });

      axios
      .post("http://localhost:5000/users/"+id+"/cancelled", cancelled)
      .catch((err)=>{
        console.log(err)
      });
      console.log(cancelled)
      

      axios
      .delete("http://localhost:5000/reservations/"+id+"/reservations/delete",cancelled)
       .catch((err) => {
        console.log(err);
  }); //call working but overall not working


  axios
  .patch("http://localhost:5000/users/"+id+"/reservations/delete",cancelled)
  .catch((err) => {
    console.log(err); //call working but overall not working
  });

}
  };



  const handleChange = (event) => {
    if (cancelled !== {}) {
      setConfirm(true)
      console.log(cancelled)
      console.log(dec)
    }
    
  };
  return (
    <div>
      <div>id</div>
      <div>{confirm && ( <AlertDialog d={decided}/> )}
      
       </div>
       <div>{id}</div>
      {reservations.length>0&&<ReservationsTable func={selected} rows={reservations} />}
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
