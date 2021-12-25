import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
import DiscreteSlider from "./Slider";
import NavBar from "./NavBar";
import '../App.css';

export default function Home(props) {
  const [open, setOpen] = React.useState(false);
  const [dateError, setDateError] = React.useState(false);
  const [arriveError, setArriveError] = React.useState(false);
  const [departError, setDepartError] = React.useState(false);
  const [cabinError, setCabinError] = React.useState(false);
  const [passError, setPassError] = React.useState(false);

  const [alert, setAlert] = React.useState(false);
  const [warning, setWarning] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const { state } = useLocation();
  let { isLogged, userId } = state;

  const navigate = useNavigate();
  var from = "";
  var to = "";
  var cab = "";
  var date = [];
  var passengers = 0;
  var children = 0;

  const get_passengers = (data) => {
    
    passengers = data;
  };
  const get_children = (data) => {
    children = data;
  };
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
        let formatedData = {
          departure: res.data.departure,
          arrival: res.data.arrival,
          cabin: cab,
          children: children,
          passengers: passengers,
          userId: userId,
        };
        console.log(formatedData);
        navigate("/h/departure", { state: formatedData}); //TODO: need to fix path
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
      var st = "" + day + "-" + month + "-" + year;
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
    if(passengers === 0){
      setPassError(true);
      er = true;
    }
    return er;
  }
  return (
    <div>
      <div>
        <NavBar isLogged={isLogged} userId={userId} />
      </div>

      <div className="col-md-8 m-auto" style={{
          display:'flex',
          gap:100,
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }} >

      <form noValidate style={{
            display: 'grid',
            border: '1px solid grey',
            padding:'24px 12px',
            borderRadius:15,
            boxShadow:"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
            background:'white',
            gap: 3
          }}>
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
        <Stack direction="row" spacing={2}></Stack>

        
        
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
      <DiscreteSlider
        func={get_passengers}
        text="Adults:"
      />
      <br />
      <DiscreteSlider
        
        func={get_children}
        text="Children:"
      />

      

</form>
</div>
      <br />
      <Button variant="contained" onClick={handleChange}>
        Search
      </Button>{" "}
    </div>
  );
}
