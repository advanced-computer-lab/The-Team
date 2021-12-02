import React from "react";
import { useNavigate } from "react-router-dom";
import WithCheckBoxes from "../homepage/muiDatatable/index2.js";
import { useLocation } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

export default function Arrival(props) {
  var sel = {};
  const { state } = useLocation();
  const { selected_departure, arrival } = state;
  const navigate = useNavigate();
  const selected = (data) => {
    sel = data;
  };
  const handleChange = (event) => {
    if (sel !== {}) {
      console.log("right")
      console.log(selected_departure)
    }
  };
  return (
    <div>
      <WithCheckBoxes func={selected} rows={arrival} />
      <div>
        <Button
          variant="contained"
          onClick={handleChange}
          style={{ marginLeft: "5px" }}
        >
          Proceed
        </Button>{" "}
      </div>
    </div>
  );
}


