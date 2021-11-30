import * as React from "react";
import useDatePicker from "./DatePicker";
import Asynchronous from "./ComboBox";
import Dropdown from "./DropDown";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const { render, value } = useDatePicker();
  var from = "";
  var to = "";
  var cab = "";
  const get_from = (data) => {
    from = data;
    console.log("From: " + from);
  };
  const get_to = (data) => {
    to = data;
    console.log("To: " + to);
  };
  const cabin = (data) => {
    cab = data;
    console.log("Cabin " + cab);
  };
  const handleChange = (event) => { setOpen(!open);
    
};

  return (
    <div>
      {render}
      <br />
      <div>
        <Asynchronous func={get_from} title="Depart from:" />
      </div>
      <br />
      <div>
        <Asynchronous func={get_to} title="Arrive at:" />
      </div>
      <br />
      <div style={{ width: "25%" }}>
        <Dropdown func={cabin} />
      </div>
      <br />
      <div>
        {" "}
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleChange}>
            Search
          </Button>{" "}
        </Stack>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
     
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
}
