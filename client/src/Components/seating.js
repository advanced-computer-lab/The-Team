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
import { getContrastRatio } from "@material-ui/core";
import EventSeatIcon from '@mui/icons-material/EventSeat';
import DeleteIcon from '@mui/icons-material/Delete';
import NextPlanIcon from '@mui/icons-material/NextPlan';


export default function Seating() {
  const { state } = useLocation();
  const { arrival, departure, cabin, children, passengers,userId } = state;
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
  var tot = children + passengers;
  var departure_seats = [];

  useEffect(() => {
    async function fetchMyAPI() {
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
      } else if (cabin === "Business") {
        while (y < buss.length) {
          if (buss[y] == 1) {
            departure_seats.push(y);
          }
          y++;
        }
      } else {
        while (y < firs.length) {
          if (firs[y] == 1) {
            departure_seats.push(y);
          }
          y++;
        }
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
      setDeparture_seats(departure_seats);
    }
    fetchMyAPI();
  }, [change]);

  const handleChange = (e, dep) => {
    if (dep === "departure") {
      if (!deptemp.includes(e)) {
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
      if (!arrtemp.includes(e)) {
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
  const handleClick = () => {
    

    if (deptemp.length != tot) {
      setAlert(true);
      setOpen(true);
    }
    if (arrtemp.length != tot) {
      setAlert(true);
      setOpen(true);
    } else {
      navigate("/h/summary", {
        state: {
          departure:departure,
          arrival:arrival,
          cabin:cabin,
          children:children,
          passengers:passengers,
          arrival_seats:arrtemp,
          departure_seats:deptemp,
          arrival_seats1:chosena,
          departure_seats1:chosend,
          userId:userId,

        },
      });

    }
  };
  const handleDelete = () => {
    setChosena([]);
    setChosend([]);
    setdeptemp([]);
    setarrtemp([]);
  };

  return (
    <div  style={{
      
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
      <div>Choose {tot} Departure Seat(s) :</div>
      
      <ButtonGroup disableElevation variant="contained">
        {departure_seats1.map((e) => (
          <Button
            onClick={() => handleChange(e, "departure")}
            variant="contained"
            startIcon={<EventSeatIcon/>}
          >
             {e}
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
              startIcon={<EventSeatIcon/>}
            >
              {e}
            </Button>
          ))}
        </ButtonGroup>
        <div>Departure Seats : {chosend}</div>
        <div>Arrival Seats : {chosena}</div>
        <div>
          <Button variant="contained" endIcon={<NextPlanIcon/>} onClick={() => handleClick()}>
            Procced
          </Button>
        </div>
        <div style={ {
     padding:"15px 13px"
      }} >
      
          <Button variant="contained"  endIcon={<DeleteIcon/>} onClick={() => handleDelete() }>
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
