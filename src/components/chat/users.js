import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

import axios from 'axios';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: "10px",
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: "10px",
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);




export default function AllUsers({roomid,onInfo,users}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async() => {
    console.log(roomid);
    const {data}  = await axios.get(`/roomUserInfo/${roomid}`);
    onInfo(data)
    setOpen(true);
   
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Check online
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        This common box contain information about users wich is inline
        </DialogTitle>
        <DialogContent dividers>
        <ul>
          {users.map((user)=>
              (<div>
              <li key="index">the user {user} is online</li> 
              </div>)
          )}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}