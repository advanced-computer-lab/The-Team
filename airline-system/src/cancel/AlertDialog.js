import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(true);



  const handleCloseDiscard = () => {
    setOpen(false);
  };
  const handleCloseDelete = () => { 
    props.d(true);


    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseDiscard}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"DELETION CONFIRMATION?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the selected reservation?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDiscard}>Discard</Button>
          <Button onClick={handleCloseDelete} >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
