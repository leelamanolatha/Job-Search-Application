import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { register, login } from '../../apiCalls/authenticate';
import { useAlert } from "react-alert";
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions';

// transition effect on dialog
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// function to display dialog with form fields to sign up or login
function Login({ open, handleClose, type, loginUserProp }){

    // user details for login / signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const alert = useAlert();

    const onsubmit = (event) => {
        event.preventDefault();

        // sign up / login based on selected type
        if(type===2){
            if(password===confPassword)
            {
                const data = {
                    username:email,
                    password:password,
                    confPassword:confPassword,
                }            
                register(data).then(()=>{
                    // console.log("Registered Successfully");
                    alert.success("Registered Successfully");
                }).catch(()=>{
                    // console.log("Unsuccessfull Registration");
                    alert.error("Unsuccessfull Registration");
                })
                setEmail('');setPassword('');setConfPassword('');
            }
        }
        else{
            const data = {
                username:email,
                password:password,                
            }
            login(data).then((response)=>{
                const { data } = response.data;
                loginUserProp(data.username);
                // console.log("Logged In Successfully");
                alert.success("Logged In Successfully");
                handleClose();
            }).catch(()=>{
                // console.log("Unsuccessfull Login");
                alert.error("Unsuccessfull Login");
            })
            setEmail('');setPassword('');setConfPassword('');
        }
    }
    
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle style={{backgroundColor:'#ccd3ed'}} disableTypography id="form-dialog-title">
                    {
                        type===1 ?
                        <Typography variant="h5"> Login </Typography>
                        :
                        <Typography variant="h5"> Sign Up </Typography>
                    }
                </DialogTitle>
                <DialogContent style={{backgroundColor:'#ccd3ed'}}>
                    {
                        type===1 ?
                        <DialogContentText>
                            If already registered, please continue to log in.
                        </DialogContentText>
                        :<DialogContentText>
                            If not yet signed up, please continue to sign up.
                        </DialogContentText>
                    }
                    <form onSubmit={onsubmit}>                   
                        <TextField
                            autoFocus
                            variant="outlined"
                            margin="dense"
                            id="name"
                            required
                            value={email}
                            label="Email Address"                        
                            onInput={ e=>setEmail(e.target.value)}
                            type="email"
                            fullWidth
                        />
                    
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            required
                            value={password}
                            label="Password"                        
                            onInput={ e=>setPassword(e.target.value)}
                            type="password"
                            fullWidth
                        />
                        {
                            type===2?
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    onInput={ e=>setConfPassword(e.target.value)}
                                    id="confirm_password"
                                    required
                                    value={confPassword}
                                    error={confPassword!==password?true:false}
                                    label="Confirm Password"
                                    type="password"
                                    fullWidth
                                    helperText={confPassword!==password?"Passwords don't match.":""}
                                /> : <></>
                        }
                        <DialogActions style={{backgroundColor:'#ccd3ed'}}>
                            <Button onClick={handleClose} style={{color:'black'}}>
                                Close
                            </Button>
                            <Button type="submit" style={{color:'blue'}}>
                                Submit
                            </Button>
                        </DialogActions>                
                    </form>
                </DialogContent>
            </Dialog>
        </div>  
    )
}

const mapDispatchToProps = (dispatch) => ({
    loginUserProp: (username) => dispatch(loginUser(username)),
});
  
export default connect(null, mapDispatchToProps)(Login);