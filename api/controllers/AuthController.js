const userModel = require("../models/Users");
const apiResponse = require("../helpers/apiResponse");
const { body, validationResult } = require("express-validator");

// register a new user
exports.register = [ 
	body('username').notEmpty().trim(),	
	body('password').notEmpty().trim(),	
	
	async (req,res) => {
		try{			
			const errors = validationResult(req);
			if(!errors.isEmpty())
				return apiResponse.validationErrorWithData(res, "validation error", errors.array());
			let newUser = {
				username: req.body.username,
				password: req.body.password,				
			};
			const user = await userModel.create(newUser);			
			return apiResponse.successResponse(res, "registered successfully");
		}catch(err){
			return apiResponse.ErrorResponse(res, err);
		}
	},
];

// allow user's login based on correct credentials
exports.login = [ 
	body("username").notEmpty().trim().escape(),
	body("password").notEmpty(),
	async (req,res)	=>	{
		try{
			const errors = validationResult(req);
			if(!errors.isEmpty())
				return apiResponse.validationErrorWithData(res, "validation error", errors.array());
				
			const  foundUser = await userModel.findOne({username: req.body.username});
			if(foundUser===null)
				return apiResponse.notFoundResponse(res, "User not found");				
			
			if(!(await foundUser.comparePassword(req.body.password, foundUser.password)))
				return apiResponse.validationErrorWithData(res, "validation error", {error: "Wrong Password"});
			
			return apiResponse.successResponseWithData(res, "Login successful",{ username: req.body.username });
		}catch(err){
			return apiResponse.ErrorResponse(res, err);
		}
	}
];