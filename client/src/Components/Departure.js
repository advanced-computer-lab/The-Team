import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WithCheckBoxes from "../homepage/muiDatatable/index2.js";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";


import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";


export default function Departure() {
  const [change, setChange] = React.useState(false);

  const { state } = useLocation();
  const { departure, arrival, cabin, children, passengers,userId} = state;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openal, setOpenal] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [row, setRow] = React.useState([]);
  var tot = passengers + children;
  var removed = [];

  useEffect(() => {
    seat();
    removeSeats();
  }, [change]);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const selected = (data) => {
    setRow(data);
    handleClickToOpen();
  };

  const removeSeats = () => {
    var temp = departure;
    for (let index = 0; index < removed.length; index++) {
      var inn = removed[index];
      temp.splice(inn, 1);
    }
  };

  const seat = () => {
    var i = 0;
    while (departure.length > 0 && i < departure.length) {
      var y = 0;
      var availableSeats = 0;
      var eco = departure[i]["Economy_seats"];
      var buss = departure[i]["Business_seats"];
      var firs = departure[i]["First_seats"];

      if (cabin === "Economy") {
        while (y < eco.length) {
          if (eco[y] == 1) {
            availableSeats++;
          }
          y++;
        }

        if (availableSeats < tot) removed.push(i);

        departure[i] = Object.assign(departure[i], { Seats: availableSeats });

        setChange(true);
      } else if (cabin === "Business") {
        while (y < buss.length) {
          if (buss[y] == 1) {
            availableSeats++;
          }
          y++;
        }
        if (availableSeats < tot) removed.push(i);
        departure[i] = Object.assign({ Seats: availableSeats }, departure[i]);

        setChange(true);
      } else {
        while (y < firs.length) {
          if (firs[y] == 1) {
            availableSeats++;
          }
          y++;
        }
        if (availableSeats < tot) removed.push(i);
        departure[i] = Object.assign({ Seats: availableSeats }, departure[i]);

        setChange(true);
      }
      i++;
    }
  };

  const handleChange = () => {
    let formatedData = {
      selected_departure: row["_id"],
      arrival: arrival,
      cabin: cabin,
      children: children,
      passengers: passengers,
      userId:userId,
    };
    if (row.length != 0) {
      navigate("/h/return", {
        state: formatedData,
      });
    } else {
      setAlert(true);
      setOpenal(true);
    }
  };
  return (
    <div>
      <AppBar  position="static" sx={{
    backgroundColor:"#006fa2"
}}>
        <Toolbar>
        <Button href="/h" variant="text" sx={{
    color:"white"
    
}} >
Home
    </Button>

    <IconButton style={{
      marginLeft:"1400px"
    }}
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                href="/h/profile"
              >
                <AccountCircle />
              </IconButton>


        </Toolbar>
      </AppBar>
      <div style={{
        fontStyle:"oblique",
        fontSize:30
      }}>Choose departure flight</div>
      {change && (
        <WithCheckBoxes func={selected} rows={departure} cc={change} />
      )}
      <div>
        <Button
          variant="contained"
          onClick={handleChange}
          style={{ marginLeft: "5px" }}
        >
          Proceed
        </Button>{" "}
      </div>

      <Dialog
      
      
        fullWidth={true}
        maxWidth={"xs"}
        open={open}
        onClose={handleToClose}
      >
        <DialogTitle>{"Flight Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Flight Number :{row["Flight_no"]}
            <br />
            Departure :{row["Dep_time"]}
            <br />
            Arrival :{row["Arr_time"]}
            <br />
            Duration :{row["Trip_duration"]}
            <br />
            Cabin class :{cabin}
            <br />
            Baggage allowance :{row["Baggage_allowance"]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openal}
        >
          <Collapse in={alert}>
            <Alert
              variant="filled"
              severity="error"
              onClose={() => {
                setAlert(false);
                setOpenal(false);
              }}
            >
              <AlertTitle>Error</AlertTitle>
              <strong>Please choose a flight</strong>
            </Alert>
          </Collapse>
        </Backdrop>
      </div>
    </div>
  );
}
