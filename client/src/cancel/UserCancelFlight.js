import { useNavigate } from "react-router-dom";
import ReservationsTable from "./ReservationsTable";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from 'react';
import AlertDialog from "./AlertDialog";
import axios from 'axios'


export default function UserCancelFlight() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [reservations, setReservations] = React.useState([]);
  const [cancelled, setCancelled] = React.useState({});
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [passport, setPassport] = React.useState("");
  const [mail, setEmail] = React.useState("");

  var [confirm, setConfirm] = React.useState(false);
  var [decision, setDecision] = React.useState(false);
  var [clicked, setClicked] = React.useState(false);
  var dec=false;



  useEffect(() => {

    let {id}  = state;

    axios({
      method: "get", //you can set what request you want to be
      url: "http://localhost:5000/reservations/userreservations",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res)=> {
      setReservations(res.data)})

      .catch((err) => {
        console.log(err);
      });


      axios({
        method: "get", //you can set what request you want to be
        url: "http://localhost:5000/users/getuser/",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res)=> {
        setFname(res.data.Fname)
        setLname(res.data.Lname)
        setPassport(res.data.Passport_number)
        setEmail(res.data.Email)})
  
        .catch((err) => {
          console.log(err);
        });



      


    

  


    
  },[reservations.length]);
  let {id}  = state;

  const selected = (data) => {
    setCancelled(data)
  };

  const click = (data) => {
    setClicked(data)
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

      axios({
        method: "post", //you can set what request you want to be
        url: "http://localhost:5000/users/cancelled",
        data: cancelled,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .catch((err) => {
          console.log(err);
        });



        axios({
          method: "patch", //you can set what request you want to be
          url: "http://localhost:5000/reservations/reservations/delete",
          data: cancelled,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .catch((err) => {
            console.log(err);
          });


          axios({
            method: "patch", //you can set what request you want to be
            url: "http://localhost:5000/users/reservations/delete",
            data: cancelled,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
            .catch((err) => {
              console.log(err);
            });


            axios({
              method: "get", //you can set what request you want to be
              url: "http://localhost:5000/reservations/userreservations",
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              setReservations(res.data);
            })
              .catch((err) => {
                console.log(err);
              });


}
  };



  const handleChange = (event) => {
    if (cancelled !== {}) {
      setConfirm(true)
      setClicked(true);
    }
    
  };
  const handleUpdate = (event) => {
    let formatedData = {
      id: cancelled["id"],
      userId:cancelled["userId"],
      Confirmation_Number:cancelled["Confirmation_Number"],
      price:cancelled["Price"],
      Arr_Flight_no:cancelled["Arr_Flight_no"],
      Arr_Flight_id:cancelled["Arr_Flight_id"],
      Dep_Flight_no:cancelled["Dep_Flight_no"],
      Dep_Flight_id:cancelled["Dep_Flight_id"],
      Arr_eSeats:cancelled["Arr_eSeats"],
      Arr_bSeats:cancelled["Arr_bSeats"],
      Arr_fSeats:cancelled["Arr_fSeats"],
      Dep_eSeats:cancelled["Dep_eSeats"],
      Dep_bSeats:cancelled["Dep_bSeats"],
      Dep_fSeats:cancelled["Arr_fSeats"],
    };
    if (cancelled !== {}) {
      navigate("/h/changeres", {
        state: formatedData,
      });
    }
    else{
      //to be done
    }
    
  };
  return (
    <div>
      <div> first name: {fname},last name: {lname},passport number: {passport},email: {mail}</div>
      <div>{clicked&&confirm && ( <AlertDialog d={decided} appear={click}/> )}
      
       </div>
      {reservations.length>0&&<ReservationsTable func={selected} rows={reservations} />}
      <div>
        <Button
          variant="contained"
          onClick={handleChange}
          style={{ marginLeft: "5px" }}
        >
          Delete
        </Button>{" "}
        <Button
          variant="contained"
          onClick={handleUpdate}
          style={{ marginLeft: "5px" }}
        >
          Change Reservation
        </Button>{" "}
      </div>
    </div>
  );
}
