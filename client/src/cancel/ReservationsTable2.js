import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
export default function ReservationsTable(props) {
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: "id",
        field: "id",
        width: 100,
      },
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
        label: "Arr_Flight_no",
        field: "Arr_Flight_no",  
        width: 100,
      },
      {
        label: "Arr_Flight_id",
        field: "Arr_Flight_id", 
        width: 100,
      },
      {
        label: "Dep_Flight_no",
        field: "Dep_Flight_no",  
        width: 100,
      },
      {
        label: "Dep_Flight_id",
        field: "Dep_Flight_id", 
        width: 100,
      },
      {
        label: "Arr_eSeats",
        field: "Arr_eSeats",
        width: 100,
      },
      {
        label: "Arr_bSeats",
        field: "Arr_bSeats",
        width: 100,
      },
      {
        label: "Arr_fSeats",
        field: "Arr_fSeats",
        width: 100,
      },
      {
        label: "Dep_eSeats",
        field: "Dep_eSeats",
        width: 100,
      },
      {
        label: "Dep_bSeats",
        field: "Dep_bSeats",
        width: 100,
      },
      {
        label: "Dep_fSeats",
        field: "Dep_fSeats",
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
        searching={false}
        headCheckboxID="id2"
        bodyCheckboxID="checkboxes2"
        getValueCheckBox={(e) => {
          showLogs2(e);
          props.func(e);
        }}
        style={{
          textalign:"center",
          width:"100%",
          backgroundColor:"black",}}
      />{" "}
    </>
  );
}
