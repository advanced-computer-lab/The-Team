import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
export default function Summary() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [change, setChange] = React.useState(false);
  const [priced, setPriced] = React.useState(0);
  const [pricea, setPricea] = React.useState(0);
  const [confirm, setConfirm] = React.useState("");
  const [addedarr, setAddedarr] = React.useState({});
  const [addeddep, setAddeddepp] = React.useState({});
  const [flightd, setFlightd] = React.useState(0);
  const [flighta, setFlighta] = React.useState(0);
  const [dated, setDated] = React.useState("");
  const [datea, setDatea] = React.useState("");
  const [timea, setTimea] = React.useState("");
  const [timed, setTimed] = React.useState("");
  const {
    arrival,
    departure,
    cabin,
    children,
    passengers,
    arrival_seats,
    departure_seats,
    arrival_seats1,
    departure_seats1,
    userId,
  } = state;
  useEffect(() => {
    async function fetchMyAPI() {
        console.log(userId)
      var tot = children + passengers;
      var departure1 = await axios
        .get("http://localhost:5000/flights/" + departure)
        .catch((err) => {
          console.log(err);
        });
      var arrival1 = await axios
        .get("http://localhost:5000/flights/" + arrival)
        .catch((err) => {
          console.log(err);
        });
      var temp = departure1.data["Price"];
      var temp1 = arrival1.data["Price"];
      if (cabin == "Economy") {
        setPriced(temp[0] * tot);
      } else if (cabin == "Business") {
        setPriced(temp[1] * tot);
      } else {
        setPriced(temp[2] * tot);
      }
      if (cabin == "Economy") {
        setPricea(temp1[0] * tot);
      } else if (cabin == "Business") {
        setPricea(temp1[1] * tot);
      } else {
        setPricea(temp1[2] * tot);
      }
      setFlightd(departure1.data["Flight_no"]);
      setFlighta(arrival1.data["Flight_no"]);
      setTimed(departure1.data["Dep_time"]);
      setTimea(arrival1.data["Dep_time"]);
      setDated(departure1.data["Dep_date"]);
      setDatea(arrival1.data["Dep_date"]);
      setConfirm(userId + departure1.data["Flight_no"] +arrival1.data["Flight_no"]);
      setAddeddepp(departure1);
      setAddedarr(arrival1);
    }

    fetchMyAPI();
    
    setChange(true);
  }, [change]);

  const handleChange = () => {
    if(userId ===""){
    }
    else{
    const data = {
      confirm: confirm,
    };
    var Arr_eSeats = [];
    var Arr_bSeats = [];
    var Arr_fSeats = [];
    var Dep_eSeats = [];
    var Dep_bSeats = [];
    var Dep_fSeats = [];
    console.log(data)

    if (cabin == "Economy") {
      Arr_eSeats = arrival_seats;
      Dep_eSeats = departure_seats;
    } else if (cabin == "Business") {
      Arr_bSeats = arrival_seats;
      Dep_bSeats = departure_seats;
    } else {
      Arr_fSeats = arrival_seats;
      Dep_fSeats = departure_seats;
    }
    const reservation = {
      userId: userId,
      Confirmation_Number: confirm,
      Price: priced + pricea,
      Arr_Flight_no: flighta,
      Arr_Flight_id: arrival,
      Dep_Flight_no: flightd,
      Dep_Flight_id: departure,
      Arr_eSeats: Arr_eSeats,
      Arr_bSeats: Arr_bSeats,
      Arr_fSeats: Arr_fSeats,
      Dep_eSeats: Dep_eSeats,
      Dep_bSeats: Dep_bSeats,
      Dep_fSeats: Dep_fSeats,
    };
    console.log(reservation)
    axios
      .patch("http://localhost:5000/flights/addedarr", reservation)
      .catch((err) => {
        console.log(err);
      });
    axios
      .patch("http://localhost:5000/flights/addeddep", reservation)
      .catch((err) => {
        console.log(err);
      });

    axios
      .patch("http://localhost:5000/users/" + userId + "/reservation/add", data)
      .catch((err) => {
        console.log(err);
      });
    axios
      .post("http://localhost:5000/reservations/add", reservation)
      .catch((err) => {
        console.log(err);
      });
    }
    navigate("/login");
  };

  return (
    <div>
      <div>Confirmation number : {confirm}</div>
      <div>Departure flight number : {flightd}</div>
      <div>Return flight number : {flighta}</div>
      <div>
        Departure flight Date : {dated} on {timed}
      </div>
      <div>
        Return flight Date : {datea} on {timea}
      </div>
      <div>Departure Seats: {departure_seats1}</div>
      <div>Arrival Seats : {arrival_seats1}</div>
      <div>Adult Tickets : {passengers}</div>
      <div>Children Tickets : {children}</div>
      <div>Choosen Cabin : {cabin}</div>
      <div>Departure Flight Price : ${priced}</div>
      <div>Arrival Flight Price : ${pricea}</div>
      <div>Total Price : ${pricea + priced}</div>
      <div>
        <Button onClick={() => handleChange()} variant="contained">
          Confirm Pay
        </Button>
      </div>
    </div>
  );
}
