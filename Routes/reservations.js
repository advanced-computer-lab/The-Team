const router = require("express").Router();
let reservation = require("../Models/reservations.model");
let user = require("../Models/users.model");

router.route("/").get((req, res) => {
  console.log(req);
  reservation
    .find()
    .then((reservation) => res.json(reservation))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/userreservations").get((req, res) => {
   const token = req.headers.authorization.split(" ")[1];
   const userData = {};
   userData.data = await verifyToken(token);
  
  const userid = userData.data.id;
  const newreserved = reservation
    .find({ userId: userid })
    .then((newreserved) => res.json(newreserved))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
   const token = req.headers.authorization.split(" ")[1];
   const userData = {};
   userData.data = await verifyToken(token);

  const userId = userData.data.id;
  const Confirmation_Number = req.body.Confirmation_Number;
  const Price = req.body.Price;
  const Arr_Flight_no = req.body.Arr_Flight_no;
  const Arr_Flight_id = req.body.Arr_Flight_id;
  const Dep_Flight_no = req.body.Dep_Flight_no;
  const Dep_Flight_id = req.body.Dep_Flight_id;
  const Arr_eSeats = req.body.Arr_eSeats;
  const Arr_bSeats = req.body.Arr_bSeats;
  const Arr_fSeats = req.body.Arr_fSeats;
  const Dep_eSeats = req.body.Dep_eSeats;
  const Dep_bSeats = req.body.Dep_bSeats;
  const Dep_fSeats = req.body.Dep_fSeats;

  const newReservation = new reservation({
    userId,
    Confirmation_Number,
    Price,
    Arr_Flight_no,
    Arr_Flight_id,
    Dep_Flight_no,
    Dep_Flight_id,
    Arr_eSeats,
    Arr_bSeats,
    Arr_fSeats,
    Dep_eSeats,
    Dep_bSeats,
    Dep_fSeats,
  });

  newReservation
    .save()
    .then(() => res.json("reservation Added!"))
    .catch((err) => res.status(400).json("Error " + err));
});

async function verifyToken(token) {
  var returnData = {};
  jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
    //console.log(authData);
    if (err) {
      returnData = {
        password: "",
      };
    } else {
      returnData = authData;
    }
  });
  //console.log(returnData);
  return returnData;
}

router.route("/reservations/delete").patch((req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userData = {};
  userData.data = await verifyToken(token);
  var conNumbers = req.body.Confirmation_Number;
  console.log(req.body);

  reservation
    .findOne({
      userId: userData.data.id,
      Confirmation_Number: conNumbers,
    })
    .remove()
    .then(() => res.json("Reservation deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id/reservations").get((req, res) => {
  reservation
    .findById(req.params.id)
    .then((users) => res.json(users.Flights))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
