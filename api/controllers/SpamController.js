const spamModel = require("../models/spam");
const apiResponse = require("../helpers/apiResponse");
const { body, validationResult } = require("express-validator");

// count the number of spam reports
exports.spamCount = [ 
    body("jobId").notEmpty().trim().escape(),
    body("jobCompany").notEmpty().trim().escape(),
	async (req,res)	=>	{
		try{            
			const errors = validationResult(req);
			if(!errors.isEmpty())
				return apiResponse.validationErrorWithData(res, "validation error", errors.array());
            
            let foundJob = null;
            await spamModel.findOne({jobId: req.body.jobId, jobCompany: req.body.jobCompany }).then((res)=>{
                foundJob = res;
            });
            
			if(foundJob===null){                
				return apiResponse.successResponseWithData(res, "Not found", 0);
            }				
            
            return apiResponse.successResponseWithData(res, "Found", foundJob.count);
		}catch(err){
			return apiResponse.ErrorResponse(res, err);
		}
	}
];