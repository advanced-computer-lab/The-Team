import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WithCheckBoxes from "../homepage/muiDatatable/index.js";
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



export default function ChangeArrival() {
    const [change, setChange] = React.useState(false);
    const { state } = useLocation();
    const { arrival, cabin,price, seats,id,reservation} = state;
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [openal, setOpenal] = React.useState(false);
    const [alert, setAlert] = React.useState(false);
    const [row, setRow] = React.useState([]);
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
      var temp = arrival;
      for (let index = 0; index < removed.length; index++) {
        var inn = removed[index];
        temp.splice(inn, 1);
      }
    };
  
    const seat = () => {
      var i = 0;
      while (arrival.length > 0 && i < arrival.length) {
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
  
          if (availableSeats < seats) removed.push(i);
          var tempPrice=arrival[i]["Price"][0]*seats-(price/2);
          
          arrival[i] = Object.assign( { PriceDif: tempPrice },arrival[i]);
          arrival[i] = Object.assign( { Seats: availableSeats },arrival[i]);
          
  
  
          setChange(true);
        } else if (cabin === "Business") {
          while (y < buss.length) {
            if (buss[y] == 1) {
              availableSeats++;
            }
            y++;
          }
          if (availableSeats < seats) removed.push(i);
          var tempPrice=arrival[i]["Price"][1]*seats-(price/2);
          arrival[i] = Object.assign( { PriceDif: tempPrice },arrival[i]);
          arrival[i] = Object.assign({ Seats: availableSeats }, arrival[i]);
  
          setChange(true);
        } else {
          while (y < firs.length) {
            if (firs[y] == 1) {
              availableSeats++;
            }
            y++;
          }
          if (availableSeats < seats) removed.push(i);
          var tempPrice=arrival[i]["Price"][2]*seats-(price/2);
          arrival[i] = Object.assign( { PriceDif: tempPrice },arrival[i]);
          arrival[i] = Object.assign({ Seats: availableSeats }, arrival[i]);
  
          setChange(true);
        }
        i++;
      }
    };
  
    const handleChange = () => {
      let formatedData = {
        id: id,
        arrival:  row["_id"],
        arrival_no: row["Flight_no"],
        cabin: cabin,
        seats:seats,
        money:row["PriceDif"],
        price:price,
        reservation:reservation,
      };
      if (row.length != 0) {
        navigate("/h/seatingarr", {
          state: formatedData,
        });}
      // } else {
      //   setAlert(true);
      //   setOpenal(true);
      // }
    };
    return (
      <div>
        <div>Choose a new arrival flight</div>
        {change && (
          <WithCheckBoxes func={selected} rows={arrival} cc={change} />
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
