import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
export default function ReservationsTable(props) {
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: "userId",
        field: "userId",
        width: 100,
      },
      {
        label: "Confirmation_Number",
        field: "Confirmation_Number",
        width: 100,
      },
      {
        label: "Price",
        field: "Price",
        width: 100,
      },
      {
        label: "Flight_no",
        field: "Flight_no",  //should include 2 fl. numbers
        width: 100,
      },
      {
        label: "Flight_id",
        field: "Flight_id", //should include 2 fl. ids
        width: 100,
      },
      {
        label: "eSeats",
        field: "eSeats",
        width: 100,
      },
      {
        label: "bSeats",
        field: "bSeats",
        width: 100,
      },
      {
        label: "fSeats",
        field: "fSeats",
        width: 100,
      },
    ],
    rows: props.rows,
  });



  const [checkbox1, setCheckbox1] = React.useState("");

  const showLogs2 = (e) => {
    setCheckbox1(e);
  
  };

  return (
    <>
      <MDBDataTableV5
        hover
        entriesOptions={[5, 20, 25]}
        entries={5}
        pagesAmount={4}
        data={datatable}
        checkbox
        headCheckboxID="id2"
        bodyCheckboxID="checkboxes2"
        getValueCheckBox={(e) => {
          showLogs2(e);
          props.func(e);
        }}
      />{" "}
    </>
  );
}
