import React from "react";
import { MDBDataTableV5 } from "mdbreact";
export default function WithCheckBoxes(props) {

 
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: "From",
        field: "From",
        width: 150,
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
        entriesOptions={[5, 20, 25]}
        entries={5}
        pagesAmount={4}
        data={datatable}
        checkbox
        headCheckboxID="id2"
        bodyCheckboxID="checkboxes2"
        getValueCheckBox={(e) => {
          console.log(props.rows);
          showLogs2(e);
          props.func(e);
        }}
      />{" "}
    </>
  );
}
