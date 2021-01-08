const faker = require('faker');

const os = require('os');
const util = require('util');


/****************************/

function randomPersonList(count) {
	const person = () => ({
		name: faker.name.findName(),
		email: faker.internet.email(),
		text: faker.lorem.text(1),
	})
	
	const personList = [];
	
	for (let i = 0; i < count; i++) {
		personList.push({ id: i, ...person() })
	}
	
	return personList;
}

function bytesToSize(bytes) {
	if (bytes === 0) return 'n/a'
	
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	const splitBytesIntoDots = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
	if (splitBytesIntoDots === 0) return `${ bytes } ${ sizes[ splitBytesIntoDots ] })`;
	
	return `${ (bytes / (1024 ** splitBytesIntoDots)).toFixed(1) } ${ sizes[ splitBytesIntoDots ] }`;
}

/****************************/

function commandList(command) {
	const commandsList = {
		"help" : "commands list",
		"author" : "Kirill Bukovski",
		"version" : "v1.0.0",
		"fill" : util.format("%O", randomPersonList(5)),
		"info" : util.format("%O", {
			"Platform": process.platform,
			"Architecture": process.arch,
			"CPU": os.cpus()[ 0 ].model,
			"Free memory": bytesToSize(os.freemem())
		}),
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

