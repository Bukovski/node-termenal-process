console.log("Start project");



/****************************/

function commandList(command) {
	const commandsList = {
		"help" : "commands list",
		"author" : "Kirill Bukovski",
		"version" : "v1.0.0",
		"fill" : "fill db data",
		"info" : {
			"Platform": "linux",
			"Architecture": "x64",
			"CPU": "cpu model",
			"Free memory": "3.4GB"
		},
		"dir" : `Full path to file: ${ __filename }`
	}
	
	const commandString = command.toString().trim();
	
	process.stdout.write(commandString.toUpperCase());
	
	if (commandsList[ commandString ]) {
		return commandsList[ commandString ];
	}	else if (commandString === "exit") {
		return process.exit(1)
	} else {
		return "Command not found, use 'help' to select command from list"
	}
}


/****************************/


function terminalQuestion() {
	function ask(text) {
		process.stdout.write(`\n ${ text }` );
		process.stdout.write(`\n > `);
	}
	
	process.stdin.on('data', function (data) {
		ask(commandList(data));
	});
	
	ask("Enter the command or use the command 'help'");
}

terminalQuestion();

