import React from 'react';
import { Link } from "react-router-dom";
import DataTable from "../homepage/muiDatatable/index.js";
import { useLocation } from 'react-router-dom';

export default function Departure() {
const { state } = useLocation();
const {departure} = state
    console.log(state);
  return (
    <div>
      <DataTable  rows={departure}/>
    </div>
  );
}
