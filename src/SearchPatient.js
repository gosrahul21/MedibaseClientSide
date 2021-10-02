
import React,{useState} from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input'
import { Redirect ,history} from 'react-router';
import { useHistory } from 'react-router';
import axios from 'axios'

const SearchPatient = ({message,children,setEmail,email}) => {
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const redirect = () => {
      handleClose()
      history.push(`/search-profile/${email}`)

  }

  return (
    <div>
      <Button variant="outlined" 
                
              color="primary" onClick={handleClickOpen}>
                  {children}
                  
        </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            {/* message to be put here */}
           Search Other Users/Friends
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          {message}
          </DialogContentText>
            <Input onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Patient Id"/>
        </DialogContent>
        <DialogActions>
          <Button variant = "outlined" onClick={redirect} color="primary">
           Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


  

export default SearchPatient;