import React, { useEffect } from 'react';
import { Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { authenticateUser, logoutUser } from '../redux/actions';
import './Profile.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { getSaved } from '../apiCalls/savejobs';
import JobBoard from './JobBoard';


// styles for application content
const useStyles = makeStyles((theme) => ({
    maintitle: {
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
        marginTop: '500px',
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
        marginTop: 'auto',
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
    },
    title: {
        [theme.breakpoints.up('xs')]:{
			fontSize: '1rem'
		},
		[theme.breakpoints.up('sm')]:{
			fontSize: '1.1rem'
		},
		[theme.breakpoints.up('md')]:{
			fontSize: '1.2rem'
		},
		[theme.breakpoints.up('lg')]:{
			fontSize: '1.5rem'
		},
		[theme.breakpoints.up('xl')]:{
			fontSize: '2.2rem',
		}
    },
    company: {
        [theme.breakpoints.up('xs')]:{
			fontSize: '0.95rem'
		},
		[theme.breakpoints.up('sm')]:{
			fontSize: '1rem'
		},
		[theme.breakpoints.up('md')]:{
			fontSize: '1.1rem'
		},
		[theme.breakpoints.up('lg')]:{
			fontSize: '1.3rem'
		},
		[theme.breakpoints.up('xl')]:{
			fontSize: '2rem',
		}
    },
    location: {
        [theme.breakpoints.up('xs')]:{
			fontSize: '0.8rem'
		},
		[theme.breakpoints.up('sm')]:{
			fontSize: '0.9rem'
		},
		[theme.breakpoints.up('md')]:{
			fontSize: '1rem'
		},
		[theme.breakpoints.up('lg')]:{
			fontSize: '1.2rem'
		},
		[theme.breakpoints.up('xl')]:{
			fontSize: '1.5rem',
		}
    }
}));


function Profile({ authenticateUserProp, logoutUserProp, username }) {    
    
    const classes = useStyles();
    
    const [savedJobs, updateSavedJobs] = React.useState([]);
    
    // authenticate the user
    useEffect(() => {
        authenticateUserProp();
    }, [authenticateUserProp]);

    // get the saved jobs of user
    useEffect(()=>{
        getSaved({username: username}).then((res)=>{
            updateSavedJobs(res.data.data);
        })
    },[]);

    return (
        
            <div className="profile-container">
                <img className="profile-image" src="/assets/images/blue-collar-worker.jpg" />
                <div className="hidden"></div>
                <div style={{width:'100%',display:'flex',flexDirection:'row-reverse',marginRight:'5%'}}>
                    <Tooltip title="">
                        <Button 
                            variant="contained" 
                            onClick={()=>{
                                logoutUserProp();
                            }}
                            style={{backgroundColor:'#4286d4',marginTop:'1%',marginRight:'2%'}}
                        >
                            Logout
                        </Button>
                    </Tooltip>
                    <Button                                        
                        startIcon={<ArrowBackIcon/>}
                        href="/"
                        style={{position:'fixed',left:'1%',color:'white',top:'1%'}}
                    >
                        Back to Search
                    </Button>
                </div>

                {/* Title Contents of the page */}
                <div className="title-container">
                    <Typography variant="h3" component="h2" style={{fontFamily: '"Kalam",cursive'}} className={classes.tagline}>
                        Your Saved Jobs
                    </Typography>
                </div>
                
                <JobBoard filteredJobs={savedJobs} />
            </div>
        
    )
}

// Get the loggedIn status of the user from redux store
const mapStateToProps = (state) => ({
    loggedIn: state.authenticationReducer.loggedIn,
    username: state.authenticationReducer.username
});

const mapDispatchToProps = (dispatch) => ({
    authenticateUserProp: () => dispatch(authenticateUser()),
    logoutUserProp: () => dispatch(logoutUser()),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Profile);