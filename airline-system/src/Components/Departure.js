import React, { useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import WithCheckBoxes from "../homepage/muiDatatable/index2.js";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { set } from 'date-fns';

export default function Departure() {
  var sel = {};
  const [change, setChange] = React.useState(false);

  const { state } = useLocation();
  const { departure, arrival, cabin } = state;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [row, setRow] = React.useState([]);
 
  useEffect(() => {
    seat();
    
  },[change])
 

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const selected = (data) => {
    setRow(data);
    sel = data["_id"];
    handleClickToOpen();

  };
  const seat = () => {
    var i = 0;
    while (i < departure.length) {
      var y = 0;
      var availableSeats = 0;
      var eco=departure[i]["Economy_seats"];
      var buss=departure[i]["Business_seats"];
      var firs=departure[i]["First_seats"];
      
      if (cabin === "Economy") {
        while (y < eco.length) {
          if (eco[y] == 1) {
            availableSeats++;
          }
          y++
        }
        departure[i]=Object.assign(departure[i],{Seats:availableSeats});
        setChange(true);
        console.log(departure[i])
      } else if (cabin === "Business") {
        
        while (y < buss.length) {
          if (buss[y] == 1) {
            availableSeats++;
          }
          y++
        }
        departure[i]=Object.assign({Seats:availableSeats},departure[i]);
        setChange(true);
      } else {
        
        while (y < firs.length) {
          if (firs[y] == 1) {
            availableSeats++;
          }
          y++
        }
        departure[i]=Object.assign({Seats:availableSeats},departure[i]);
        setChange(true);
      }
      i++;
    }
  };

  const handleChange = () => {
    navigate("/h/return", {
      state: {
        selected: sel,
        arrival: arrival,
        cabin:cabin
      },
    });
  };

  return (
    <div>{
      change && <WithCheckBoxes func={selected} rows={departure} cc={change} />
    }
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
            Cabin class :{row["Flight_no"]}
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
    </div>
  );
}
