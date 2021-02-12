import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './Job.css';
import { Tooltip, Button } from '@material-ui/core';
import { spamCount } from '../apiCalls/spam';

// styles for Job's basic Description Content.
const useStyles = makeStyles((theme) => ({
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

// function to return card displaying job's basic details.
export default function Job({job, onClick}) {
    
    let title = job.title;
	let modTitle;
	
	const [count,setCount] = useState(0);

    if(title.length >= 50){
        modTitle = title.slice(0,45).concat('...');
    }
    else{
        modTitle = title;
	}
	
	useEffect(()=>{
		const jobDetails = {
			jobId: job.id,
			jobCompany: job.company,
		}
		spamCount(jobDetails).then((res)=>{
			setCount(res.data.data);
		});
	},[]);

    // Styles
    const classes = useStyles();

    return (
        <Paper onClick={onClick} className={'job'} style={{backgroundColor:'#e1e1ed',boxShadow:'2px 5px 5px 0px #e1e1ed'}}>
            <div>
                <Typography className={classes.title} variant="h5">{modTitle}</Typography>
                <Typography className={classes.company} variant="h6">{job.company}</Typography>
                <Typography className={classes.location} >{job.location}</Typography>
           </div>
           <div>
               <Typography className={classes.location}>{job.created_at.split(' ').splice(0, 3).join(' ')}</Typography>
			   <Tooltip className={classes.location} title="Number of spam reports.">
				   <Button>
					   Spam : {count}
					</Button>
			   </Tooltip>
           </div>
        </Paper>
    )
}