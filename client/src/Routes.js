import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import {fetchJobs} from './apiCalls/fetchJobs';
import Main from "./components/Main";
import Profile from "./components/Profile";
import JobBoard from "./components/JobBoard";
import { connect } from 'react-redux';
import { authenticateUser } from './redux/actions';


const options = {
    timeout: 2000,
    position: positions.BOTTOM_RIGHT
};


function Routes({ loggedIn, authenticateUserProp, username }) {

	// states to store the fetched jobs and filtered jobs respectively.
    const [jobsList, updateJobs] = useState([]);
    const [filteredList, updateFiltered] = useState(jobsList);
	
	// fetch the jobs.
    useEffect(() => {
		fetchJobs(updateJobs);
		fetchJobs(updateFiltered);
	}, []); 

	

  	useEffect(() => {
    	authenticateUserProp();
  	}, [authenticateUserProp]);

  	if (loggedIn === undefined) return null;

	// search jobs list on search.
	const handleSearchChange = (e) => {
		let currentJobs = jobsList;
		let filteredJobs = [];
		let input = e.target.value;

		// if search input is not empty.
		if (input !== "") {
			currentJobs = jobsList;
			filteredJobs = currentJobs.filter((job) => {
				let title = job.title.toLowerCase();
				let company = job.company.toLowerCase();
				let description = job.description.toLowerCase();
				let location = job.location.toLowerCase();
				
				let inpLC = input.toLowerCase();

				if (
					title.includes(inpLC) ||
					company.includes(inpLC) ||
					description.includes(inpLC) ||
					location.includes(inpLC)
				) {
					return true;
				}
				else {
					return false;
				}
			});
		} else {
			filteredJobs = currentJobs;
		}
		
		updateFiltered(filteredJobs);
	};

  	return (
    	<Router>
      		<Switch>
				{/* Route to main page to search jobs */}
        		<Route exact path="/">
					<Provider template={AlertTemplate} {...options}>
            			<Main jobs={filteredList} searchOnChange={handleSearchChange} />
						<JobBoard filteredJobs={filteredList} />
					</Provider>
        		</Route>
				
				{/* Route to saved jobs page only when logged in */}
        		<Route exact path="/savedjobs">
          			{loggedIn ? <Provider template={AlertTemplate} {...options}><Profile /></Provider> : <Redirect to="/" />}
        		</Route>        
      		</Switch>
    	</Router>
  	);
}

const mapStateToProps = (state) => ({
  loggedIn: state.authenticationReducer.loggedIn,
  username: state.authenticationReducer.username,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUserProp: () => dispatch(authenticateUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
