import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
    useNavigate
} from 'react-router-dom';
import UserProfile from "../UserProfile";

//import { useNavigation } from '@react-navigation/native';

function Login(props) {
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");

    const [userValid, setUserValid] = React.useState("");

    const navigate = useNavigate();
    const goToLoginPage = () => navigate('/login');

    //   const { state } = useLocation();
    //   const { id } = state;

    const handlePass = (event) => {
        setPassword(event.target.value);
    };
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };


    const onSubmit = () => {
        var flag1 = false;
        var flag2 = false;

        if (Password.length == 0 || Email.length == 0) {
            alert("enter all fields please please");
        }
        else { flag1 = true }

        if (typeof Email !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

            if (!pattern.test(Email)) {
                alert("enter valid email");
            }
            else {
                flag2 = true;
            }
        }

        if(flag1 && flag2) {

            const data = {
                //  id: id,
                Password: Password,
                Email: Email,
            };

            axios.post("http://localhost:5000/users/login", data)
                .then(res => {

                    if(res.data.message=="Email not found")
                    alert(res.data.message);
                    if(res.data.message=="Email and password do not match")
                    alert(res.data.message);
                    if(res.data.message=="Success"){
                        //handle token
                    goToLoginPage();}
                })
        }
    };

    return (
        <div className="Login In">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <br />
                    </div>
                    <div className="col-md-8 m-auto">
                        <h1
                            style={{
                                color: "rgb(51,51,51)",
                            }}
                        >
                            Sign In!
                        </h1>
                    </div>
                </div>

                <div
                    className="col-md-8 m-auto"
                    style={{
                        display: "flex",
                        gap: 24,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <form
                        noValidate
                        onSubmit={onSubmit}
                        style={{
                            display: "grid",
                            border: "1px solid grey",
                            padding: "24px 12px",
                            borderRadius: 12,
                            boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                            background: "white",
                            gridTemplateColumns: "300px 300px",
                            gap: 12,
                        }}
                    >



                        <div className="form-group">
                            <TextField
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                onChange={handleEmail}
                            />
                        </div>

                        <div className="form-group">
                            <TextField
                                input type="password"
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                onChange={handlePass}
                            />
                        </div>

                    </form>
                    <Button onClick={onSubmit} variant="contained">
                        submit
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;
