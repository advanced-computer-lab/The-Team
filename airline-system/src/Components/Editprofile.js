import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios';
import { authInitialProps, FormControl, InputLabel } from "@mui/material"



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

render() 
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
                    
                    <FormControl  margin="normal" required fullWidth>
                        <InputLabel htmlFor="First_name">First_name</InputLabel>
                        <Input 
                          type="text"

                          name="First_name"

                          value={First_name}

                          onChange={this.handelChange}/>  
                          
                                        

                          
                    </FormControl>

                    <FormControl  margin="normal" required fullWidth>
                        <InputLabel htmlFor="Last_name">Last_name</InputLabel>
                        <Input 
                          type="text"

                          name="Last_name"

                          value={Last_name}

                          onChange={this.handelChange}/>  
                          
                                        

                          
                    </FormControl>

                    <FormControl  margin="normal" required fullWidth>
                        <InputLabel htmlFor="Passport_no">Passport_no</InputLabel>
                        <Input 
                          type="text"

                          name="Passport_no"

                          value={Passport_no}

                          onChange={this.handelChange}/>  
                          
                                        

                          
                    </FormControl>

                    <FormControl  margin="normal" required fullWidth>
                        <InputLabel htmlFor="Email">Email</InputLabel>
                        <Input 
                          type="text"

                          name="Email"

                          value={Email}

                          onChange={this.handelChange}/>  
                          
                                        

                          
                    </FormControl>

                    <Button
                       
                       type="submit"

                       fullWidth

                       disabled={isLoading}

                       variant="contained"

                       color="primary"

                       className={classes.submit}>
                           save
                       </Button>
                </form>
            </paper>
        </div>
    )

