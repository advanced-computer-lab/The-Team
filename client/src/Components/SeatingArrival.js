import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ButtonGroup from "@mui/material/ButtonGroup";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import Backdrop from "@mui/material/Backdrop";
import { useNavigate } from "react-router-dom";

export default function SeatingArrival() {
  const { state } = useLocation();
  const { arrival, cabin, seats,money,id,arrival_no } = state;
  const [reservations, setReservations] = React.useState([]);
  const [change, setChange] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [chosena, setChosena] = React.useState([]);
  const [arrival_seats1, setArrival_seats] = React.useState([]);
  const [arrtemp, setarrtemp] = React.useState([]);
  const navigate = useNavigate();
  var arrival_seats = [];
  var tot =seats;

  useEffect(() => {
    async function fetchMyAPI() {

      var arrival1 = await axios
        .get("http://localhost:5000/flights/" + arrival)
        .catch((err) => {
          console.log(err);
        });
     
      var y = 0;
      var eco1 = arrival1.data["Economy_seats"];
      var buss1 = arrival1.data["Business_seats"];
      var firs1 = arrival1.data["First_seats"];
      if (cabin === "Economy") {
        while (y < eco1.length) {
          if (eco1[y] == 1) {
            arrival_seats.push(y);
          }
          y++;
        }
        setChange(true);
      } else if (cabin === "Business") {
        while (y < buss1.length) {
          if (buss1[y] == 1) {
            arrival_seats.push(y);
          }
          y++;
        }
        setChange(true);
      } else {
        while (y < firs1.length) {
          if (firs1[y] == 1) {
            arrival_seats.push(y);
          }
          y++;
        }
        setChange(true);
      }
      setArrival_seats(arrival_seats);
    
    }
    fetchMyAPI();
  }, [change]);

  const handleChange = (e) => {
    if(arrtemp.length<seats && !arrtemp.includes(e)){
       
        var arr = [chosena];
        arr.push(" Seat ");
        arr.push(e);
        arrtemp.push(e);
        setChosena(arr);
        
      } else {
        setAlert(true);
        setOpen(true);
      }
  };
  const handleClick =async() => {
    
    if (arrtemp.length != tot) {
      setAlert(true);
      setOpen(true);
    } else {
 
      await axios
        .get("http://localhost:5000/reservations/"+ id + "/reservations")
        .then((res) => {
          setReservations(res.data);

          console.log(reservations);
        })
        .catch((err) => {
          console.log(err);
        });
        console.log(reservations);
        

      await axios
        .patch("http://localhost:5000/flights/cancelledarr", reservations)
        .catch((err) => {
          console.log(err);
        });
      await axios({
        method: "patch", //you can set what request you want to be
        url: "http://localhost:5000/reservations/reservations/delete",
        data: reservations,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).catch((err) => {
        console.log(err);
      });
      var Arr_eSeats=[];
      var Arr_bSeats=[];
      var Arr_fSeats=[];
      if (cabin === "Economy"){
        Arr_eSeats=arrtemp;
      }else if(cabin === "Business"){
        Arr_bSeats=arrtemp;
      }else{
        Arr_fSeats=arrtemp;
      }
      
      const reservation1 = {
        userId: reservations.userId,
        Confirmation_Number: reservations.Confirmation_Number,
        Price: money,
        Dep_Flight_no: reservations.Dep_Flight_no,
        Dep_Flight_id: reservations.Dep_Flight_id,
        Arr_Flight_no: arrival_no,
        Arr_Flight_id:arrival,
        Dep_eSeats: reservations.Dep_eSeats,
        Dep_bSeats: reservations.Dep_bSeats,
        Dep_fSeats: reservations.Dep_fSeats,
        Arr_eSeats: Arr_eSeats,
        Arr_bSeats: Arr_bSeats,
        Arr_fSeats:Arr_fSeats ,
      };
      await axios
        .patch("http://localhost:5000/flights/addedarr", reservation1)
        .catch((err) => {
          console.log(err);
        });
      await axios({
        method: "post", //you can set what request you want to be
        url: "http://localhost:5000/reservations/add",
        data: reservation1,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).catch((err) => {
        console.log(err);
      });
      let formatedData = {
        money: money,
      };
      if ((money = 0)) {
      } else if (money < 0) {
        console.log("send mail");
      } else {
        navigate("/pay", { state: formatedData });
      }

    }
  };
  const handleDelete = () => {
    setChosena([]);
    setarrtemp([]);
  };

  return (
    <div>
        <div>Choose {tot} Arrival Seat(s) :</div>
        <ButtonGroup disableElevation variant="contained">
          {arrival_seats1.map((e) => (
            <Button
              onClick={() => handleChange(e)}
              variant="contained"
            >
              Seat {e}
            </Button>
          ))}
        </ButtonGroup>
        <div>Arrival Seats : {chosena}</div>
        <div>
          <Button variant="contained" onClick={() => handleClick()}>
            Procced
          </Button>
        </div>
        <div>
      
          <Button variant="contained" onClick={() => handleDelete()}>
            Clear All
          </Button>
          <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <Collapse in={alert}>
            <Alert
              variant="filled"
              severity="error"
              onClose={() => {
                setAlert(false);
                setOpen(false);
              }}
            >
              <AlertTitle>Error</AlertTitle>
              <strong>Please choose right seats</strong>
            </Alert>
          </Collapse>
          </Backdrop>
          
        </div>
      </div>
    
  );
}
