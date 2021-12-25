import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ButtonGroup from "@mui/material/ButtonGroup";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import Backdrop from "@mui/material/Backdrop";
import { useNavigate } from "react-router-dom";

export default function ChangeSeats() {
  const { state } = useLocation();
  const { arrival, departure, seats,reservation } = state;
  const [change, setChange] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [chosend, setChosend] = React.useState([]);
  const [alert, setAlert] = React.useState(false);
  const [chosena, setChosena] = React.useState([]);
  const [arrival_seats1, setArrival_seats] = React.useState([]);
  const [departure_seats1, setDeparture_seats] = React.useState([]);
  const [deptemp, setdeptemp] = React.useState([]);
  const [arrtemp, setarrtemp] = React.useState([]);
  const navigate = useNavigate();
  var arrival_seats = [];
  var tot = seats;
  var departure_seats = [];
  const [cabin, setCabin] = React.useState("First_class");
  

  useEffect(() => {
    async function fetchMyAPI() {
      if (reservation.Dep_eSeats.length>0){
        setCabin("Economy");
      }
      else if (reservation.Dep_bSeats.length>0){
       setCabin("Business");
      }
      
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
      var y = 0;
      var eco = departure1.data["Economy_seats"];
      var buss = departure1.data["Business_seats"];
      var firs = departure1.data["First_seats"];
      if (cabin === "Economy") {
        while (y < eco.length) {
          if (eco[y] == 1) {
            departure_seats.push(y);
          }
          y++;
        }
         var te= reservation.Dep_eSeats;
        departure_seats=departure_seats.concat(te);
      } else if (cabin === "Business") {
        while (y < buss.length) {
          if (buss[y] == 1) {
            departure_seats.push(y);
          }
          y++;
        }
        var te= reservation.Dep_bSeats;
        departure_seats=departure_seats.concat(te);
      } else {
        while (y < firs.length) {
          if (firs[y] == 1) {
            departure_seats.push(y);
          }
          y++;
        }
        var te= reservation.Dep_fSeats;
        departure_seats=departure_seats.concat(te);
      }
      y = 0;
      var eco1 = arrival1.data["Economy_seats"];
      var buss1 = arrival1.data["Business_seats"];
      var firs1 = arrival1.data["First_seats"];
      if (cabin === "Economy") {
        while (y < eco1.length) {
          if (eco1[y] == 1) {
            arrival_seats.push(y);
          }
          y++;
        }
        var te= reservation.Arr_eSeats;
        arrival_seats=arrival_seats.concat(te);
        setChange(true);
      } else if (cabin === "Business") {
        while (y < buss1.length) {
          if (buss1[y] == 1) {
            arrival_seats.push(y);
          }
          y++;
        }
        var te= reservation.Arr_bSeats;
        arrival_seats=arrival_seats.concat(te);
        setChange(true);
      } else {
        while (y < firs1.length) {
          if (firs1[y] == 1) {
            arrival_seats.push(y);
          }
          y++;
        }
        var te= reservation.Arr_fSeats;
        arrival_seats=arrival_seats.concat(te);
        setChange(true);
      }
      setArrival_seats(arrival_seats);
      setDeparture_seats(departure_seats);
    }
    fetchMyAPI();
  }, [change]);

  const handleChange = (e, dep) => {
    if (dep === "departure") {
      if (deptemp<seats &&!deptemp.includes(e)) {
        var arr = [chosend];
        arr.push(" Seat ");
        arr.push(e);
        deptemp.push(e);
        setChosend(arr);
        console.log(chosend);
      } else {
        setAlert(true);
        setOpen(true);
      }
    } else {
      if (arrtemp<seats && !arrtemp.includes(e)) {
        var arr = [chosena];
        arr.push(" Seat ");
        arr.push(e);
        arrtemp.push(e);
        setChosena(arr);
        
      } else {
        setAlert(true);
        setOpen(true);
      }
    }
  };
  const handleClick =async () => {
    
    
    if (deptemp.length != tot) {
      setAlert(true);
      setOpen(true);
    }
    if (arrtemp.length != tot) {
      setAlert(true);
      setOpen(true);
    } else {
      console.log(reservation)
      await axios
      .patch("http://localhost:5000/flights/cancelledarr", reservation)
      .catch((err)=>{
        console.log(err)
      });

     await axios
      .patch("http://localhost:5000/flights/cancelleddep", reservation)
      .catch((err)=>{
        console.log(err)
      });
     await axios({
        method: "patch", //you can set what request you want to be
        url: "http://localhost:5000/reservations/reservations/delete",
        data: reservation,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .catch((err) => {
          console.log(err);
        });
        var Arr_eSeats=[];
        var Arr_bSeats=[];
        var Arr_fSeats=[];
        var Dep_eSeats=[];
        var Dep_bSeats=[];
        var Dep_fSeats=[];
        console.log(cabin);
        if (cabin==="Economy"){
          Arr_eSeats=arrtemp;
          Dep_eSeats=deptemp;
          
        }
        else if(cabin==="Business"){
          Arr_bSeats=arrtemp;
          Dep_bSeats=deptemp;
        }
        else{
          Arr_fSeats=arrtemp;
          Dep_fSeats=deptemp;
        }
        const reservation1 = {
          userId: reservation.userId,
          Confirmation_Number: reservation.Confirmation_Number,
          Price: reservation.price,
          Arr_Flight_no: reservation.Arr_Flight_no,
          Arr_Flight_id: reservation.Arr_Flight_id,
          Dep_Flight_no: reservation.Dep_Flight_no,
          Dep_Flight_id: reservation.Dep_Flight_id,
          Arr_eSeats: Arr_eSeats,
          Arr_bSeats: Arr_bSeats,
          Arr_fSeats: Arr_fSeats,
          Dep_eSeats: Dep_eSeats,
          Dep_bSeats: Dep_bSeats,
          Dep_fSeats: Dep_fSeats,
        };
        await axios
        .patch("http://localhost:5000/flights/addedarr", reservation1).then(()=>{
          axios
          .patch("http://localhost:5000/flights/addeddep", reservation1)
          .catch((err) => {
            console.log(err);
          });
        })
        .catch((err) => {
          console.log(err);
        });
     
        await axios({
          method: "post", //you can set what request you want to be
          url: "http://localhost:5000/reservations/add",
          data:reservation1,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .catch((err) => {
            console.log(err);
          });
navigate("/h/profile/reservations");

    
  }
};
  const handleDelete = () => {
    setChosena([]);
    setChosend([]);
    setdeptemp([]);
    setarrtemp([]);
  };

  return (
    <div>
      <div>Choose {tot} Departure Seat(s) :</div>
      <ButtonGroup disableElevation variant="contained">
        {departure_seats1.map((e) => (
          <Button
            onClick={() => handleChange(e, "departure")}
            variant="contained"
          >
            Seat {e}
          </Button>
        ))}
      </ButtonGroup>
      <div>
        <div>Choose {tot} Arrival Seat(s) :</div>
        <ButtonGroup disableElevation variant="contained">
          {arrival_seats1.map((e) => (
            <Button
              onClick={() => handleChange(e, "arrival")}
              variant="contained"
            >
              Seat {e}
            </Button>
          ))}
        </ButtonGroup>
        <div>Departure Seats : {chosend}</div>
        <div>Arrival Seats : {chosena}</div>
        <div>
          <Button variant="contained" onClick={() => handleClick()}>
            Procced
          </Button>
        </div>
        <div>
      
          <Button variant="contained" onClick={() => handleDelete()}>
            Clear All
          </Button>
          <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <Collapse in={alert}>
            <Alert
              variant="filled"
              severity="error"
              onClose={() => {
                setAlert(false);
                setOpen(false);
              }}
            >
              <AlertTitle>Error</AlertTitle>
              <strong>Please choose right seats</strong>
            </Alert>
          </Collapse>
          </Backdrop>
          
        </div>
      </div>
    </div>
    
  );
}
