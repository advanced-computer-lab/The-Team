import React from "react";
import { MDBDataTableV5 } from "mdbreact";
import "../Payment/Appp.css";


export default function WithCheckBoxes(props) {

 
  const [datatable, setDatatable] = React.useState({

    columns: [
      {
        label: "From",
        field: "From",
        width: 150,
        justifyContent: "center",
          alignItems: "center",
          alignContent:"center",
          alignSelf:"center",
          //padding:"300px 120px"
        
        
      },
      {
        label: "To",
        field: "To",
        width: 270,
      },
      {
        label: "Flight_date",
        field: "Dep_date",
        width: 260,
      },
      {
        label: "Seats",
        field: "Seats",
        width: 280,
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
        
        entries={5}
        pagesAmount={4}
        data={datatable}
        checkbox
        searching={false}
        headCheckboxID="id2"
        bodyCheckboxID="checkboxes2"
        getValueCheckBox={(e) => {
          showLogs2(e);
          props.func(e);
        }}

        style={{
          width:"100%",
          backgroundColor:"black",
          justifyContent: "center",
          alignItems: "center",
          alignContent:"center",
          alignSelf:"center",

        }}
      />{" "}
    </>
  );
}
