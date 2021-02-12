import React, { useEffect } from 'react';
import { Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { authenticateUser, logoutUser } from '../redux/actions';
import './Main.css';
import JobSearchBar from './JobSearchBar';
import Login from './Authenticate/Login';


// styles for application content
const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: '"Carter One", cursive',
        color: '#FFFFFF',
        fontWeight: '40',
        padding: '0px 5px',
        marginTop: '5%',
        marginBottom: '20px',
        letterSpacing: '-2px',
    },
    tagline: {
        color: '#FFFFFF',
        marginTop: '-20px',
        textTransform: 'lowercase',
        fontVariant: 'small-caps',
        [theme.breakpoints.up('xl')]: {
            fontSize: '5rem'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.5rem'
        }
    },
    searchContainer: {
        marginTop: '-200px',
        color: 'white',        
        marginBottom: '5%'
    },
    jobNum: {
        marginLeft: '10%',
        [theme.breakpoints.up('xs')]:{
			fontSize: '0.95rem'
		},
		[theme.breakpoints.up('sm')]:{
			fontSize: '1.05rem'
		},
		[theme.breakpoints.up('md')]:{
			fontSize: '1.15rem'
		},
		[theme.breakpoints.up('lg')]:{
			fontSize: '1.25rem'
		},
		[theme.breakpoints.up('xl')]:{
			fontSize: '2rem',
		}
    }
}));


function Main({ loggedIn, authenticateUserProp, logoutUserProp, jobs, searchOnChange}) {
    
    const numJobs = jobs.length;
    const classes = useStyles();

    // dialog's open status
    const [open, setOpen] = React.useState(false);
    // login -> type = 1, signup -> type = 2
    const [type, setType] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // authenticate the user
    useEffect(() => {
        authenticateUserProp();
    }, [authenticateUserProp]);

    return (
            <div className="hero-container">
                {/* Login / Signup Dialog Box */}
                <Login open={open} handleClose = {handleClose} type= {type} />

                <img className="hero-image" src="/assets/images/blue-collar-worker.jpg" />
                <div className="hidden"></div>
                <div style={{width:'100%',display:'flex',flexDirection:'row-reverse',marginRight:'3%'}}>
                    {/* Different options based on logged in status of user */}
                    {
                        !loggedIn ? 
                            <>
                                <Tooltip title="Already registered? Login">
                                    <Button 
                                        variant="contained"
                                        onClick={()=>{
                                            handleClickOpen();
                                            setType(1);
                                        }}
                                        style={{backgroundColor:'#4286d4'}}
                                    >
                                        Login
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Not registered? Signup">
                                    <Button 
                                        variant="contained"
                                        onClick={()=>{
                                            handleClickOpen();
                                            setType(2);
                                        }}
                                        style={{marginRight:'3%',backgroundColor:'#4286d4'}}
                                    >
                                        Sign Up
                                    </Button>
                                </Tooltip>
                            </> :
                            <>
                                <Tooltip title="">
                                    <Button 
                                        variant="contained" 
                                        onClick={()=>{
                                            logoutUserProp();
                                        }}
                                        style={{backgroundColor:'#4286d4'}}
                                    >
                                        Logout
                                    </Button>
                                </Tooltip>
                                <Tooltip title="To view your saved jobs, Click Here">
                                    <Button 
                                        variant="contained"
                                        href="/savedjobs"
                                        style={{marginRight:'3%',backgroundColor:'#4286d4'}}
                                    >
                                        Profile
                                    </Button>
                                </Tooltip>
                            </>
                    }
                </div>

                {/* Title Contents of the application */}
                <div className="title-container">
                    <Typography variant="h1" component="h1" className={classes.title}>
                        Job Search
                    </Typography>
                    <Typography variant="h3" component="h2" style={{fontFamily: '"Kalam",cursive'}} className={classes.tagline}>
                        Finding jobs made easier
                    </Typography>
                </div>
                
                {/* Search Tab */}
                <div className={classes.searchContainer}>
                    <JobSearchBar handleChange = {searchOnChange} />
                    <Typography className={classes.jobNum} variant="h6" component="h2">
                        Found {numJobs} Jobs
                    </Typography>
                </div>
            </div>
        
    )
}

// Get the loggedIn status of the user from redux store
const mapStateToProps = (state) => ({
    loggedIn: state.authenticationReducer.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
    authenticateUserProp: () => dispatch(authenticateUser()),
    logoutUserProp: () => dispatch(logoutUser()),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);