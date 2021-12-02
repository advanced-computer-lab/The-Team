import React from "react";
import { useNavigate } from "react-router-dom";
import WithCheckBoxes from "../homepage/muiDatatable/index2.js";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

export default function Departure() {
  var sel = {};

  const { state } = useLocation();
  const { departure, arrival } = state;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [row, setRow] = React.useState([]);
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
    console.log(row);
  };

  const handleChange = () => {
    navigate("/h/arrive", {
      state: {
        selected: sel,
        arrival: arrival,
      },
    });
  };

  return (
    <div>
      <WithCheckBoxes func={selected} rows={departure} />
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
