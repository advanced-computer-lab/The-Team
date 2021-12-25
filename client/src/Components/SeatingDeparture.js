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

export default function SeatingDeparture() {
  const { state } = useLocation();
  const { departure, cabin, seats } = state;
  const [change, setChange] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [chosend, setChosend] = React.useState([]);
  const [departure_seats1, setDeparture_seats] = React.useState([]);
  const [deptemp, setDeptemp] = React.useState([]);
  const navigate = useNavigate();
  var departure_seats = [];
  var tot =seats;

  useEffect(() => {
    async function fetchMyAPI() {

      var departure1 = await axios
        .get("http://localhost:5000/flights/" + departure)
        .catch((err) => {
          console.log(err);
        });
     
      var y = 0;
      var eco1 = departure1.data["Economy_seats"];
      var buss1 = departure1.data["Business_seats"];
      var firs1 = departure1.data["First_seats"];
      if (cabin === "Economy") {
        while (y < eco1.length) {
          if (eco1[y] == 1) {
            departure_seats.push(y);
          }
          y++;
        }
        setChange(true);
      } else if (cabin === "Business") {
        while (y < buss1.length) {
          if (buss1[y] == 1) {
            departure_seats.push(y);
          }
          y++;
        }
        setChange(true);
      } else {
        while (y < firs1.length) {
          if (firs1[y] == 1) {
            departure_seats.push(y);
          }
          y++;
        }
        setChange(true);
      }
      setDeparture_seats(departure_seats);
    
    }
    fetchMyAPI();
  }, [change]);

  const handleChange = (e) => {
      if (!deptemp.includes(e)) {
        var dep = [chosend];
        dep.push(" Seat ");
        dep.push(e);
        deptemp.push(e);
        setChosend(dep);
        
      } else {
        setAlert(true);
        setOpen(true);
      }
  };
  const handleClick = () => {
    
    if (deptemp.length != tot) {
      setAlert(true);
      setOpen(true);
    } else {

    
      navigate("/h/summary", {
      });

    }
  };
  const handleDelete = () => {
    setChosend([]);
    setDeptemp([]);
  };

  return (
    <div>
        <div>Choose {tot} Departure Seat(s) :</div>
        <ButtonGroup disableElevation variant="contained">
          {departure_seats1.map((e) => (
            <Button
              onClick={() => handleChange(e)}
              variant="contained"
            >
              Seat {e}
            </Button>
          ))}
        </ButtonGroup>
        <div>Departure Seats : {chosend}</div>
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
    
  );
}
