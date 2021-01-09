const faker = require('faker');

const os = require('os');
const util = require('util');



/****************************/


let textColorSetting = "\x1b[0m";
// settings --color="cyan"
function textColor(color) {
	const colors =  {
		reset: "\x1b[0m",
		black: "\x1b[30m",
		red: "\x1b[31m",
		green: "\x1b[32m",
		yellow: "\x1b[33m",
		blue: "\x1b[34m",
		magenta: "\x1b[35m",
		cyan: "\x1b[36m",
		white: "\x1b[37m",
		crimson: "\x1b[38m"
	}
	
	if (colors[ color ]) {
		return textColorSetting = colors[ color ]
	}
	
	return textColorSetting;
}


let textFontSetting = "\033[22m";
// settings --font="bold"
function textFont(font) {
	const fonts =  {
		bold : '\033[1m',
		italic : '\033[3m',
		underline : '\033[4m',
		normal : '\033[22m'
	}
	
	if (fonts[ font ]) {
		return textFontSetting = fonts[ font ]
	}
	
	return textFontSetting;
}

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
	} else if (commandString.includes("settings --color=")) {
		const colorText = commandString.replace(/settings --color="(.*)"/g, "$1")
			.trim().toLowerCase();
		
		textColor(colorText);
		
		return `Text color has been changed to ${ colorText.toUpperCase() }`;
	} else if (commandString.includes("settings --font=")) {
		const fontText = commandString.replace(/settings --font="(.*)"/g, "$1")
			.trim().toLowerCase();
		
		textFont(fontText);
		
		return `Text font has been changed to ${ fontText.toUpperCase() }`;
	}	else if (commandString === "exit") {
		return process.exit(1)
	} else {
		return "Команда не найдена, используйте 'help' для выбора команды из списка"
	}
}


/****************************/


function terminalQuestion() {
	function ask(text) {
		process.stdout.write(`\n ${ textFontSetting } ${ textColorSetting } ${ text } \x1b[0m` );		process.stdout.write(`\n > `);
	}
	
	process.stdin.on('data', function (data) {
		ask(commandList(data));
	});
	
	ask("Enter the command or use the command 'help'");
}

terminalQuestion();

