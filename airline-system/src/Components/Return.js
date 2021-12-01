import React from "react";
import { useNavigate } from "react-router-dom";
import WithCheckBoxes from "../homepage/muiDatatable/index2.js";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Arrival(props) {
    const { state } = useLocation();
    console.log(state);

    return (
        <div>hello </div>
    )

}
