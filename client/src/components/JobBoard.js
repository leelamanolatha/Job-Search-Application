import React,{useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { connect } from 'react-redux';
import { useAlert } from "react-alert";
import { saveJobs } from '../apiCalls/savejobs';
import { authenticateUser } from '../redux/actions';
import Job from './Job';
import JobModal from './JobModal';

import './JobBoard.css';

// function to display the list of jobs available.
function JobBoard({filteredJobs, loggedIn, username, authenticateUserProp}) {

    const alert = useAlert();
    console.log(filteredJobs[0])
    // Modal
    const [open, setOpen] = React.useState(false);
    const [selectedJob, setSelectedJob] = React.useState({});
    const [jobs, updateJobs] = React.useState(filteredJobs);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSave = () => {
        if(!loggedIn){
            alert.error("Login to save the job.");
        }else{            
            const jobDetails = {
                jobCompany: selectedJob.company,
                jobId: selectedJob.id,
                jobDetails: selectedJob,
                username: username,
            }
            console.log(jobDetails);
            saveJobs(jobDetails).then(()=>{
                alert.success("Saved the job.");
            }).catch(()=>{
                alert.error("Couldn't save the job.");
            });
        }
    };

    useEffect(() => {
        authenticateUserProp();
    }, [authenticateUserProp]);

    useEffect(()=>{
        updateJobs(filteredJobs);
    }, [filteredJobs]);

    // Pagination
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs / 50);
    const [activeStep, setActiveStep] = React.useState(0);
    const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50) + 50);

    function scrollToTop () {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
          window.requestAnimationFrame(scrollToTop);
          window.scrollTo(0, c - c / 8);
        }
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        scrollToTop();
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        scrollToTop();
    };

    return (
        <div className="job-board-container" id="job-board">
            <JobModal open={open} username={username} job={selectedJob} handleClose = {handleClose} handleSave={handleSave}/>

            <svg className="curved-upper" xmlns="http://www.w3.org/2000/svg" viewBox="0 90 1440 105">
                <path fill="#2c69db" fill-opacity="1" d="M0,128L120,117.3C240,107,480,85,720,96C960,107,1200,149,1320,170.7L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
            </svg>

            <div className="jobs-container">
                {jobsOnPage.map(
                    (job, i) => (<Job key = {i} job={job} onClick={() => {
                        handleClickOpen();
                        setSelectedJob(job)
                    }} />)
                )}

                <Typography style={{color:'#e1e1ed'}} variant="body1">
                    Page {activeStep + 1} of {numPages}
                </Typography>

                {/* Pagination Bar */}
                <MobileStepper
                    className="mobile-stepper"
                    variant="progress"
                    steps={numPages}
                    style={{color:'white'}}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button style={{color:'white'}} size="small" onClick={handleNext} disabled={activeStep === (numPages - 1)} >
                            Next
                    <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button style={{color:'white'}} size="small" onClick={handleBack} disabled={activeStep === 0} >
                            <KeyboardArrowLeft />
                            Back
                        </Button>
                    }
                />
            </div>
        </div>
    );
}

// Get the loggedIn status of the user from redux store
const mapStateToProps = (state) => ({
    loggedIn: state.authenticationReducer.loggedIn,
    username: state.authenticationReducer.username,
});

const mapDispatchToProps = (dispatch) => ({
    authenticateUserProp: () => dispatch(authenticateUser()),
    // logoutUserProp: () => dispatch(logoutUser()),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(JobBoard);