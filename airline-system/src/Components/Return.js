import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WithCheckBoxes from "../homepage/muiDatatable/index2.js";
import { useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Backdrop from "@mui/material/Backdrop";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";

export default function Arrival(props) {
  var sel = {};
  const { state } = useLocation();
  const [change, setChange] = React.useState(false);
  const { selected_departure, arrival, cabin,children,passengers,userId } = state;
  const [open, setOpen] = React.useState(false);
  const [openal, setOpenal] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [row, setRow] = React.useState([]);
  const navigate = useNavigate();
  var tot=passengers+children;
  var removed=[];
  const handleClickToOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    seat();
    removeSeats();
  });

  const handleToClose = () => {
    setOpen(false);
  };
  const selected = (data) => {
    setRow(data);
    handleClickToOpen();
  };
  const removeSeats = () => {
    var temp=arrival;
    for (let index = 0; index < removed.length; index++) {
      var inn=removed[index]
      temp.splice(inn,1)
    }
  };

  const handleChange = (event) => {
    if (row.length!=0) {
    navigate("/h/seating", {
      state: {
        arrival: row["_id"],
        departure: selected_departure,
        cabin: cabin,
        children: children,
        passengers: passengers,
        userId:userId,
      },
    });
  }
  else{
    setAlert(true);
    setOpenal(true);
  }
  };
  const seat = () => {
    var i = 0;
    while (i < arrival.length) {
      var y = 0;
      var availableSeats = 0;
      var eco = arrival[i]["Economy_seats"];
      var buss = arrival[i]["Business_seats"];
      var firs = arrival[i]["First_seats"];

      if (cabin === "Economy") {
        while (y < eco.length) {
          if (eco[y] == 1) {
            availableSeats++;
          }
          y++;
        }
        if(availableSeats<tot)
          removed.push(i)
        arrival[i] = Object.assign(arrival[i], { Seats: availableSeats });
        setChange(true);
      } else if (cabin === "Business") {
        while (y < buss.length) {
          if (buss[y] == 1) {
            availableSeats++;
          }
          y++;
        }
        if(availableSeats<tot)
          removed.push(i)
        arrival[i] = Object.assign({ Seats: availableSeats }, arrival[i]);
        setChange(true);
      } else {
        while (y < firs.length) {
          if (firs[y] == 1) {
            availableSeats++;
          }
          y++;
        }
        if(availableSeats<tot)
          removed.push(i)
        arrival[i] = Object.assign({ Seats: availableSeats }, arrival[i]);
        setChange(true);
      }
      i++;
    }
  };
  return (
    <div>
      {change && (<WithCheckBoxes func={selected} rows={arrival} />)}
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
