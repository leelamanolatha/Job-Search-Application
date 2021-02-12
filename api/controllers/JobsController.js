var redis = require ("redis");
const saveJobsModel = require("../models/saveJobs");
const apiResponse = require("../helpers/apiResponse");
const { body, validationResult } = require("express-validator");

const client = redis.createClient();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

// get all the jobs
exports.getJobs = [
    async (req,res) => {
        const Github = await getAsync('github');
        const JSON_Github = JSON.parse(Github);

        const RemoteOK = await getAsync('remoteok');
        let JSON_RemoteOK = JSON.parse(RemoteOK);

        // Concatenate the JSON arrays into one total jobs array.
        let jobs = JSON_Github.concat(JSON_RemoteOK);
        
        let sortedJobs = jobs.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Filter array to remove false jobs.
        let filteredJobs = sortedJobs.filter(job => {
            if(job.company == ""){
                return false
            }
            return true
        })
        
        filteredJobs = JSON.stringify(filteredJobs);
        return res.send(filteredJobs)
    }
];

// save the job for currrent user
exports.saveJobs = [ 
    body("jobId").notEmpty().trim().escape(),
    body("jobCompany").notEmpty().trim().escape(),
    body("jobDetails").notEmpty(),
	body("username").notEmpty(),
	async (req,res)	=>	{
		try{
			const errors = validationResult(req);
			if(!errors.isEmpty())
				return apiResponse.validationErrorWithData(res, "validation error", errors.array());
            
            let foundJob = null;
            await saveJobsModel.findOne({jobId: req.body.jobId, jobCompany: req.body.jobCompany }).then((res)=>{
                foundJob = res;
            });
            
			if(foundJob===null){
                
                const newSavedJob = {
                    jobId: req.body.jobId,
                    jobCompany: req.body.jobCompany,
                    jobDetails: req.body.jobDetails,
                    users: [{ username: req.body.username }]
                }
                const job = new saveJobsModel(newSavedJob);
				await job.save();
				return apiResponse.successResponse(res, "New Job");
            }				
            
            let usersFound = foundJob.users;
			if(usersFound.length === 0){
                usersFound = [{ username : req.body.username}];
            }else{
                usersFound.push({
                    username: req.body.username
                });
            }
            await saveJobsModel.findOneAndUpdate({jobId: req.body.jobId, jobCompany: req.body.jobCompany }, {users: usersFound});
			
			return apiResponse.successResponse(res, "Saved the Job");
		}catch(err){
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

// check if a job is saved by user
exports.checkSaved = [ 
    body("jobId").notEmpty().trim().escape(),
    body("jobCompany").notEmpty().trim().escape(),    
    body("username").notEmpty(),
    
	async (req,res)	=>	{
		try{
            
			const errors = validationResult(req);
			if(!errors.isEmpty())
				return apiResponse.validationErrorWithData(res, "validation error", errors.array());
            
            let foundJob = null;
            await saveJobsModel.findOne({jobId: req.body.jobId, jobCompany: req.body.jobCompany }).then((res)=>{
                foundJob = res;
            });
            
			if(foundJob===null){
				return apiResponse.successResponseWithData(res, "New Job", false);
            }				
            
            let usersFound = foundJob.users;
			if(usersFound.length === 0){
                return apiResponse.successResponseWithData(res, "No user", false);
            }else
            {
                usersFound.forEach((user)=>{
                    if(user.username === req.body.username){
                        return apiResponse.successResponseWithData(res, "Saved the Job", true);
                    }
                });
            }
			return apiResponse.successResponseWithData(res, "Not Saved", false);
		}catch(err){
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

// get all the saved jobs of a current user
exports.getSavedJobs = [
	body("username").notEmpty(),
	async (req,res)	=>	{
		try{            
			const errors = validationResult(req);
			if(!errors.isEmpty())
				return apiResponse.validationErrorWithData(res, "validation error", errors.array());
            
            let foundJobs = null;
            await saveJobsModel.find({users: { $elemMatch: { username: req.body.username } } }).then((res)=>{
                foundJobs = res;
            });
            
			if(foundJobs === null || foundJobs.length === 0){
				return apiResponse.successResponseWithData(res, "No Saved Jobs", []);
            }        
            
            let savedjobs = [];
			
                foundJobs.forEach((job)=>{
                    savedjobs.push(job.jobDetails);
                });
            
			return apiResponse.successResponseWithData(res, "Saved Jobs", savedjobs);
		}catch(err){
			return apiResponse.ErrorResponse(res, err);
		}
	}
];