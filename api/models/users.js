const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 

const users = new mongoose.Schema({
	username: {
		type: String,	
		required: true
	},	
	password:{
		type: String,
		required: true
	},
});

users.pre("save", async function (next) {
	// only hash the password if it has been modified (or is new)
	if (!this.isModified("password")) return next();  
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

  users.pre("findOneAndUpdate", async function (next) {
	// only hash the password if it has been modified (or is new)
	if (this._update.password) {
		this._update.password = await bcrypt.hash(this._update.password, 10); 
		return next();
	}
	next()
  });

  

users.methods.comparePassword =  (password, hash) => bcrypt.compare(password, hash);

module.exports = mongoose.model("users",users);
