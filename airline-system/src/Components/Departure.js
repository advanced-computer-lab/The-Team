import React from "react";
import { useNavigate } from "react-router-dom";
import WithCheckBoxes from "../homepage/muiDatatable/index2.js";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Departure() {
  var sel = {};
  const { state } = useLocation();
  console.log(state);
  const { departure, arrival } = state;
  const navigate = useNavigate();
  const selected = (data) => {
    sel = data;
  };
  var returnData = {
    selected_departure: sel,
    arrival: arrival,
  };
  const handleChange = (event) => {
    if (sel !== {}) {
      navigate("/h/return", { state: returnData });
    }
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
          Return
        </Button>{" "}
      </div>
    </div>
  );
}
