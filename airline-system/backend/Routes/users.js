const router = require('express').Router();
let user = require('../models/users.model');



router.route('/').get((req, res)=>{
  console.log(req);
  user.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res)=>{
    const Username = req.body.Username;
    const Password = req.body.Password;
    const Email = req.body.Email;
    const Passport_number = req.body.Passport_number;
    const Fname = req.body.Fname;
    const Lname = req.body.Lname;
    const Home_address = req.body.Home_address;
    const Country_code = req.body.Country_code;
    const Telephone_number = req.body.Telephone_number;
    const Flights = req.body.Flights;
    
    const newUser =new user({Username, Password, Email, Passport_number, Fname, Lname, Home_address, Country_code, Telephone_number, Flights})
    
    newUser.save()
    .then(()=>res.json('User Added!'))
    .catch(err=> res.status(400).json('Error '+err));
    });


router.route('/:id').get((req, res) => {
    user.findById(req.params.id)
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/update').patch((req, res) => {
    user.findById(req.body.id)
      .then(users => {
        users.Username = req.body.Username;
        users.Password = req.body.Password;
        users.Email = req.body.Email;
        users.Passport_number = req.body.Passport_number;
        users.Fname = req.body.Fname;
        users.Lname = req.body.Lname;
        users.Home_address = req.body.Home_address;
        users.Country_code = req.body.Country_code;
        users.Telephone_number = req.body.Telephone_number;
        users.Flights = req.body.Flights;
        
        users.save()
          .then(() => res.json('user updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports= router;