
import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';


const Confirm = ({Icon,children,message,callback,type,id}) => {
    const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false)
  };
  
  const handleConfirm = ()=>{
    setOpen(false);
    callback(id);
  }

  return (
    <div>
      <Button variant="outlined" 
                
              style={{backgroundColor:"blueviolet"}} onClick={handleClickOpen}>
                  {children}
                  
        </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            {/* message to be put here */}
           Confirm 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          {message}
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
           No
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
           Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


  

export default Confirm