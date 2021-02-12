import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import './JobModal.css';
import { checkIfSaved } from '../apiCalls/savejobs';

// transition effect for the dialog.
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// function to return a dialog component to diaplay job details
export default function JobModal({job, open, handleClose, handleSave, username }) {

    let jobBoard = `From ${job.source}`;
    const [isSaved, setSaved] = useState(false);

    useEffect(()=>{
        if(username!==null){
        const jobDetails = {
            jobId: job.id,
            jobCompany: job.company,
            username: username,
        }
        checkIfSaved(jobDetails).then((res)=>{
            console.log(res.data)
            setSaved(res.data.data);
        })
    }
    },[job])

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{backgroundColor:'#e1e1ed'}} disableTypography id="alert-dialog-slide-title">
                    <Typography variant="h5"> {job.title} </Typography>
                    <Typography variant="h5"> {job.company} </Typography>
                    {job.company_logo && 
                        <img className="detail-logo" src={job.company_logo} alt={`${job.company} Logo.`} />
                    }
                    <br />
                    <Chip size="small" label={jobBoard} color="primary" />
                </DialogTitle>
                <DialogContent style={{backgroundColor:'#e1e1ed'}}>
                    
                    <DialogContentText variant="body1" 
                        id="alert-dialog-slide-description" 
                        dangerouslySetInnerHTML={ {__html: job.description}}
                    />
                </DialogContent>
                <DialogActions style={{backgroundColor:'#e1e1ed'}}>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={()=>{handleSave(); setSaved(true)}} disabled={isSaved ? true : false} color="primary">
                        {isSaved ? <> Already Saved </>  : <> Save </> }
                    </Button>
                    <a href={job.url} target="_blank">
                        <Button color="primary">
                            Apply
                        </Button>
                    </a>
                </DialogActions>
            </Dialog>
        </div>
  
    )
}