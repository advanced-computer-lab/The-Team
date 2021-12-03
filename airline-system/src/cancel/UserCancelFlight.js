import { useNavigate } from "react-router-dom";
import WithCheckBoxes from "../homepage/muiDatatable/index2.js";
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

  var sel = {};

  useEffect(() => {

    let {id}  = state;
     axios
    .get("http://localhost:5000/users/"+id+"/reservations")
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
      <WithCheckBoxes func={selected} rows={reservations} />
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
