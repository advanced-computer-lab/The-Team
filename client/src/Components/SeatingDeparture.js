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

export default function SeatingDeparture() {
  const { state } = useLocation();
  const {
    departure,
    cabin,
    seats,
    money,
    id,
    departure_no,
    price,
    reservation,
  } = state;
  const [change, setChange] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [alert, setAlert] = React.useState(false);
  const [chosend, setChosend] = React.useState([]);
  const [departure_seats1, setDeparture_seats] = React.useState([]);
  const [deptemp, setDeptemp] = React.useState([]);
  const navigate = useNavigate();
  var departure_seats = [];
  var tot = seats;

  useEffect(() => {
    async function fetchMyAPI() {
      var departure1 = await axios
        .get("http://localhost:5000/flights/" + departure)
        .catch((err) => {
          console.log(err);
        });

      var y = 0;
      var eco1 = departure1.data["Economy_seats"];
      var buss1 = departure1.data["Business_seats"];
      var firs1 = departure1.data["First_seats"];
      if (cabin === "Economy") {
        while (y < eco1.length) {
          if (eco1[y] == 1) {
            departure_seats.push(y);
          }
          y++;
        }
        setChange(true);
      } else if (cabin === "Business") {
        while (y < buss1.length) {
          if (buss1[y] == 1) {
            departure_seats.push(y);
          }
          y++;
        }
        setChange(true);
      } else {
        while (y < firs1.length) {
          if (firs1[y] == 1) {
            departure_seats.push(y);
          }
          y++;
        }
        setChange(true);
      }
      setDeparture_seats(departure_seats);
    }
    fetchMyAPI();
  }, [change]);

  const handleChange = (e) => {
    if (!deptemp.includes(e) && deptemp.length < seats) {
      var dep = [chosend];
      dep.push(" Seat ");
      dep.push(e);
      deptemp.push(e);
      setChosend(dep);
    } else {
      setAlert(true);
      setOpen(true);
    }
  };
  const handleClick = async () => {
    if (deptemp.length != tot) {
      setAlert(true);
      setOpen(true);
    } else {
      await axios
        .patch("http://localhost:5000/flights/cancelleddep", reservation)
        .catch((err) => {
          console.log(err);
        });
      await axios({
        method: "patch", //you can set what request you want to be
        url: "http://localhost:5000/reservations/reservations/delete",
        data: reservation,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).catch((err) => {
        console.log(err);
      });
      var Dep_eSeats = [];
      var Dep_bSeats = [];
      var Dep_fSeats = [];
      if (cabin === "Economy") {
        Dep_eSeats = deptemp;
      } else if (cabin === "Business") {
        Dep_bSeats = deptemp;
      } else {
        Dep_fSeats = deptemp;
      }
      var money1=money+price*3;
      const reservation1 = {
        userId: reservation.userId,
        Confirmation_Number: reservation.Confirmation_Number,
        Price: money1,
        Arr_Flight_no: reservation.Arr_Flight_no,
        Arr_Flight_id: reservation.Arr_Flight_id,
        Dep_Flight_no: departure_no,
        Dep_Flight_id: departure,
        Arr_eSeats: reservation.Arr_eSeats,
        Arr_bSeats: reservation.Arr_bSeats,
        Arr_fSeats: reservation.Arr_fSeats,
        Dep_eSeats: Dep_eSeats,
        Dep_bSeats: Dep_bSeats,
        Dep_fSeats: Dep_fSeats,
      };
      await axios
        .patch("http://localhost:5000/flights/addeddep", reservation1)
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
        money: money*100,
      };
      if (money === 0 ) {

        await axios({
          method: "post", //you can set what request you want to be
          url: "http://localhost:5000/users/moneydiff",
          data: formatedData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).catch((err) => {
          console.log(err);
        });

        alert("We sen you a mail sent for confirmation");
        navigate("/h/profile/reservations");

      } else if (money < 0) {
        await axios({
          method: "post", //you can set what request you want to be
          url: "http://localhost:5000/users/moneydiff",
          data: formatedData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).catch((err) => {
          console.log(err);
        });

        alert("We sen you a mail sent for confirmation");
        navigate("/h/profile/reservations");



      } else {
        navigate("/pay", { state: formatedData });
      }
    }
  };
  const handleDelete = () => {
    setChosend([]);
    setDeptemp([]);
  };

  return (
    <div>
      <div>Choose {tot} Departure Seat(s) :</div>
      <ButtonGroup disableElevation variant="contained">
        {departure_seats1.map((e) => (
          <Button onClick={() => handleChange(e)} variant="contained">
            Seat {e}
          </Button>
        ))}
      </ButtonGroup>
      <div>Departure Seats : {chosend}</div>
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
