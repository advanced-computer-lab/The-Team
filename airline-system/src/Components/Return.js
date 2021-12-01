import React from "react";
import { useNavigate } from "react-router-dom";
import WithCheckBoxes from "../homepage/muiDatatable/index2.js";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Return() {
  var sel = {};
  const { state } = useLocation();
  const { selected_departure, arrival } = state;
  console.log(state);
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
