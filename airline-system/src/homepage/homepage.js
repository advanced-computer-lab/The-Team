import * as React from "react";
import DatePicker from "./DatePicker";
import Asynchronous from "./ComboBox";
import Dropdown from "./DropDown";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function Home(props) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const [dateError, setDateError] = React.useState(false);
  const [arriveError, setArriveError] = React.useState(false);
  const [departError, setDepartError] = React.useState(false);
  const [cabinError, setCabinError] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [warning, setWarning] = React.useState(false);

  const [loading, setLoading] = React.useState(true);

  var from = "";
  var to = "";
  var cab = "";
  var date = [];
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
  const getDate = (data) => {
    date = data;
    console.log("Date: " + date);
  };
  const handleChange = async (event) => {
    setOpen(!open);
    var er = validateData();
    console.log(er);
    if (er) {
      setLoading(false);
      setAlert(true);
    } else {
      setLoading(true);
      setAlert(false);
      var formatedDate = formatDate(date); // [0] = depart [1] = arrive
      var queryData = {
        From: from,
        To: to,
        cabin: cab,
        DepartureDate: formatedDate[0],
        ReturnDate: formatedDate[1],
      };
      var res = await axios
        .post("http://localhost:5000/flights/search", queryData)
        .catch((err) => {
          console.log(err);
        });
      if (res.status === 204) {
        setLoading(false);
        setWarning(true);
      } else {
        var formatedData = res.data;
        console.log(formatedData);
        navigate("/h/departure", { state: formatedData }); //TODO: need to fix path
      }
    }
  };

  function formatDate(date) {
    var returnDate = [];
    for (const d of date) {
      var day = d.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      var month = d.getMonth() + 1;
      var year = d.getFullYear();
      var st = "" + year + "-" + month + "-" + day;
      returnDate.push(st);
    }
    return returnDate;
  }
  function validateData() {
    var er = false;
    if (from === "") {
      setDepartError(true);
      er = true;
    }
    if (to === "") {
      setArriveError(true);
      er = true;
    }
    if (date[0] === null || date[1] === null) {
      setDateError(true);
      er = true;
    }
    if (cab === "") {
      setCabinError(true);
      er = true;
    }
    return er;
  }
  return (
    <div>
      <div>
        <NavBar Uid = {props.Uid} />
      </div>
      <div>
        <br />
      </div>
      <DatePicker func={getDate} error={dateError} />
      <br />
      <div>
        <Asynchronous
          func={get_from}
          title="Depart from:"
          error={departError}
        />
      </div>
      <br />
      <div>
        <Asynchronous func={get_to} title="Arrive at:" error={arriveError} />
      </div>
      <br />
      <div style={{ width: "25%" }}>
        <Dropdown func={cabin} error={cabinError} />
      </div>
      <br />
      <div>
        {" "}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={handleChange}
            style={{ marginLeft: "5px" }}
          >
            Search
          </Button>{" "}
        </Stack>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          {loading && (
            <CircularProgress
              size={68}
              sx={{
                color: "#fff",
                position: "center",
                zIndex: 1,
              }}
            />
          )}
          <Collapse in={alert}>
            <Alert
              variant="filled"
              severity="error"
              onClose={() => {
                setOpen(!open);
                setAlert(false);
                setDateError(false);
                setArriveError(false);
                setDepartError(false);
                setCabinError(false);
              }}
            >
              <AlertTitle>Error</AlertTitle>
              <strong>Please Enter valid data</strong>
            </Alert>
          </Collapse>
          <Collapse in={warning}>
            <Alert
              variant="filled"
              severity="warning"
              onClose={() => {
                setOpen(!open);
                setWarning(false);
              }}
            >
              <AlertTitle>Warning</AlertTitle>
              <strong>No avaliable flights matching</strong>
            </Alert>
          </Collapse>
        </Backdrop>
        <br />
      </div>
    </div>
  );
}
