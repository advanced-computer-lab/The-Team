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

import EventSeatIcon from '@mui/icons-material/EventSeat';
import DeleteIcon from '@mui/icons-material/Delete';
import NextPlanIcon from '@mui/icons-material/NextPlan';

export default function SeatingArrival() {
  const { state } = useLocation();
  const { arrival, cabin, seats, money, id, arrival_no, price, reservation } =
    state;

  const [change, setChange] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [chosena, setChosena] = React.useState([]);
  const [arrival_seats1, setArrival_seats] = React.useState([]);
  const [arrtemp, setarrtemp] = React.useState([]);
  const navigate = useNavigate();
  var arrival_seats = [];
  var tot = seats;

  useEffect(() => {
    async function fetchMyAPI() {
      var arrival1 = await axios
        .get("http://localhost:5000/flights/" + arrival)
        .catch((err) => {
          console.log(err);
        });

      var y = 0;
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
        setChange(true);
      } else if (cabin === "Business") {
        while (y < buss1.length) {
          if (buss1[y] == 1) {
            arrival_seats.push(y);
          }
          y++;
        }
        setChange(true);
      } else {
        while (y < firs1.length) {
          if (firs1[y] == 1) {
            arrival_seats.push(y);
          }
          y++;
        }
        setChange(true);
      }
      setArrival_seats(arrival_seats);
    }
    fetchMyAPI();
  }, [change]);

  const handleChange = (e) => {
    if (arrtemp.length < seats && !arrtemp.includes(e)) {
      var arr = [chosena];
      arr.push(" Seat ");
      arr.push(e);
      arrtemp.push(e);
      setChosena(arr);
    } else {
      setAlert(true);
      setOpen(true);
    }
  };
  const handleClick = async () => {
    if (arrtemp.length != tot) {
      setAlert(true);
      setOpen(true);
    } else {
      await axios
        .patch("http://localhost:5000/flights/cancelledarr", reservation)
        .catch((err) => {
          console.log(err);
        });
      await axios({
        method: "patch", //you can set what request you want to be
        url: "http://localhost:5000/reservations/reservations/delete",
        data: reservation,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).catch((err) => {
        console.log(err);
      });
      var Arr_eSeats = [];
      var Arr_bSeats = [];
      var Arr_fSeats = [];
      if (cabin === "Economy") {
        Arr_eSeats = arrtemp;
      } else if (cabin === "Business") {
        Arr_bSeats = arrtemp;
      } else {
        Arr_fSeats = arrtemp;
      }
      var money1=money+price*3;

      const reservation1 = {
        userId: reservation.userId,
        Confirmation_Number: reservation.Confirmation_Number,
        Price: money1,
        Dep_Flight_no: reservation.Dep_Flight_no,
        Dep_Flight_id: reservation.Dep_Flight_id,
        Arr_Flight_no: arrival_no,
        Arr_Flight_id: arrival,
        Dep_eSeats: reservation.Dep_eSeats,
        Dep_bSeats: reservation.Dep_bSeats,
        Dep_fSeats: reservation.Dep_fSeats,
        Arr_eSeats: Arr_eSeats,
        Arr_bSeats: Arr_bSeats,
        Arr_fSeats: Arr_fSeats,
      };
      await axios
        .patch("http://localhost:5000/flights/addedarr", reservation1)
        .catch((err) => {
          console.log(err);
        });
      await axios({
        method: "post", //you can set what request you want to be
        url: "http://localhost:5000/reservations/add",
        data: reservation1,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).catch((err) => {
        console.log(err);
      });

      let formatedData = {
        money: money*100,
      };
      if (money === 0) {
        await axios({
          method: "post", //you can set what request you want to be
          url: "http://localhost:5000/users/moneydiff",
          data: formatedData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).catch((err) => {
          console.log(err);
        });

        alert("We sen you a mail sent for confirmation");
        navigate("/h/profile/reservations");

      } else if (money < 0) {
        console.log("send mail");
        await axios({
          method: "post", //you can set what request you want to be
          url: "http://localhost:5000/users/moneydiff",
          data: formatedData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).catch((err) => {
          console.log(err);
        });

        alert("We sen you a mail sent for confirmation");
        navigate("/h/profile/reservations");


      } else {
        var ff=money*100
        localStorage.setItem("monney",ff)
        navigate("/pay", { state: formatedData });
      }
    }
  };
  const handleDelete = () => {
    setChosena([]);
    setarrtemp([]);
  };

  return (
    <div style={{
      
      display: "flex",
      gap: 24,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      align:"center",
      width: "30vw",
      backgroundColor:"blue",
      
    border: "1px solid grey",
    padding: "23px 10px",
    marginLeft:"530px",
    marginTop:"150px",
    fontSize: 18,
    fontStyle:"italic",

    borderRadius: 12,
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    background: "white",
    gridTemplateColumns: "300px 300px",
   
  }}>
      <div>Choose {tot} Arrival Seat(s) :</div>
      <ButtonGroup disableElevation variant="contained">
        {arrival_seats1.map((e) => (
          <Button onClick={() => handleChange(e)} variant="contained" startIcon={<EventSeatIcon/>}>
             {e}
          </Button>
        ))}
      </ButtonGroup>
      <div>Arrival Seats : {chosena}</div>
      <div>
        <Button variant="contained" endIcon={<NextPlanIcon/>}  onClick={() => handleClick()}>
          Procced
        </Button>
      </div>
      <div>
        <Button variant="contained" endIcon={<DeleteIcon/>}  onClick={() => handleDelete()}>
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
  );
}
