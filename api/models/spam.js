const mongoose = require("mongoose");

const spam = new mongoose.Schema({
	jobId: {
		type: String,	
		required: true
	},	
	jobCompany:{
		type: String,
		required: true
    },
    count: 0
});

module.exports = mongoose.model("spam",spam);
