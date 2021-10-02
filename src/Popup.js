import React,{useState} from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

// import { Redirect ,history} from 'react-router';
import { useHistory } from 'react-router';

const Popup = ({className,message,children,summary,callback}) => {
    const [open, setOpen] = useState(false);
    const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const redirect = () => {
    
    handleClose();
    callback();    
  }

  return (
    <>
      <div className={className} variant="outlined" 
                
              color="primary" onClick={handleClickOpen}>
                  {children}
                  
        </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            {/* message to be put here */}
           {summary}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          {message}
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button style={{color:"red"}}color="error" onClick={redirect} variant="outlined">
           Yes Logout
          </Button>
          <Button variant="outlined" onClick={handleClose} color="primary">
           No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


  

export default Popup;