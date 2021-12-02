import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
  
export default function Label(props) {
  const [open, setOpen] = React.useState(true);
  
  const handleClickToOpen = () => {
    setOpen(true);
  };
  
  const handleToClose = () => {
    setOpen(false);
  };
  
  return (
    
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"Flight Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Flight Number :{props.flight_no} 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToClose} 
                  color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}