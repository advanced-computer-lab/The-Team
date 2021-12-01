import React from "react";
import { useNavigate } from "react-router-dom";
import WithCheckBoxes from "../homepage/muiDatatable/index2.js";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Departure() {
  var sel = {};
  const { state } = useLocation();

  const { departure, arrival } = state;
  const navigate = useNavigate();

  const selected =  (data) => {
     sel =  data["_id"];
     console.log(sel)
  };

  const handleChange = () => {
    navigate("/h/arrive", { state : {
      selected: sel,
      arrival : arrival,
    } });
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
    </div>
  );
}
