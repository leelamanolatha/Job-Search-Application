const mongoose = require("mongoose");

const saveJobs = new mongoose.Schema({
	jobId: {
		type: String,	
		required: true
	},	
	jobCompany:{
		type: String,
		required: true
	},
	jobDetails: {
		type: Object,
		required: true
	},
    users: [{
		username:String,
	}],
});

module.exports = mongoose.model("saveJobs",saveJobs);
