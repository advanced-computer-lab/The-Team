import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios';
import { authInitialProps } from "@mui/material"



class Editprofile extends React.Component{
    state = {
        First_name: "",
        Last_name: "",
        Passport_no:"",
        Email:"",

    };
    componentDidMount() {

        const { auth } = this.props;
        
        getAuthUser(auth.user.First_name)
          .then(user =>{
              this.setState({
                  ...user
              })
          })
          .catch((error) => {
            console.log(error);
          })
      }
}

render() {
    const { classes } = this.props;
    const { First_name, Last_name, Passport_no, Email} = this.state;

    return(
        <div className={classes.root}>
            <paper className={classes.paper}>
                <EditSharp />
                <Typography variant="h5" Component="h1">
                    Edit profile
                </Typography>
                <form className={classes.form}>
                    
                </form>
            </paper>
        </div>
    )
}
