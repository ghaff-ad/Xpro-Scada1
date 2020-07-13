// USER PROGRAM
// User programs are written in Javascript and executed by NodeJS
// All valid NodeJS programs are valid user programs
// User programs consist of three predefined functions: loop_interval(), setup() and loop()
// Default Location of User Programs: AppFolder/programs
// Location of user programs can be specified in the config.js file.
// "user_program_folder": "projects/programs"

function loop_interval() {
	// This function is optional
	// Return the loop delay here
	// Valid Range (ms): 5 to 60000
    return 100;
}

async function setup() {
	// This function is executed once
	// Use it for any initialization
}

async function loop() {
	// This function is executed continously
	// Put your main program here
	// Default interval is 500ms. Override with return value in loop_interval()
}
