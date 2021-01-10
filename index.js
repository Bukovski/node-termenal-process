const faker = require('faker');

const os = require('os');


/****************************/

const letterSpaceSeparator = (str, lines) => { //separates each character in a line with spaces
	str = (typeof(str) === 'string' && str.trim().length) ? str.trim() : '';
	lines = (typeof(lines) === 'number' && lines > 0) ? lines : 1;
	
	const splitText = str.split('')
	let textLine = ''
	
	
	for (let textIndex = 0, splitLength = splitText.length; textIndex < splitLength; textIndex++) {
		for (let index = 0; index < lines; index++) {
			textLine += ' ';
		}
		
		textLine += splitText[ textIndex ]
	}
	
	return textLine;
};

/*
	decorates the data object as a two-column form
	
	id       : 4
  name     : Tim Price
  email    : Ayden.Bernier62@yahoo.com
  text     : quod
 */
const formObjectSpace = (obj) => {
	let textLine = "";
	
	const sortKeysLength = Object.keys(obj)
		.sort((a, b) => b.length - a.length)
	const maxLengthKeys = sortKeysLength[ 0 ].length + 15;
	
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			const value = obj[ key ];
			let line = '\n \x1b[33m ' + key + ' \x1b[0m';
			const padding = maxLengthKeys - line.length;
			
			for (let i = 0; i < padding; i++) {
				line += ' ';
			}
			
			line += ' : ' + value + "\n";
			textLine += line;
		}
		
	}
	
	return textLine
}

const formArraySpace = (arr) => { // the same as the formObjectSpace function only for an array of objects (collection)
	let textLine = "";
	
	arr.forEach(obj => {
		textLine += formObjectSpace(obj) + horizontalLine()
	})
	
	return textLine
}

const horizontalLine = () => { // fill the string with dashes from start to finish line
	const width = process.stdout.columns; // Get the available screen size
	let line = '';
	
	for (let i = 0; i < width; i++) {
		line += '-';
	}
	
	return line + '\n';
};

const centeredText = (str) => { //put the text on center
	str = (typeof(str) === 'string' && str.trim().length) ? str.trim() : '';
	
	let line = '';
	const width = process.stdout.columns; // Get the available screen size
	const leftPadding = Math.floor((width - str.length) / 2); // Calculate the left padding there should be
	
	for (let i = 0; i < leftPadding; i++) {
		line += ' ';
	}
	
	line += str + '\n';
	
	return line;
};

/****************************/

let textColorSetting = "\x1b[0m";
// settings --color="cyan"
function textColor(color) {
	color = (typeof(color) === 'string' && color.trim().length) ? color.trim() : '';
	
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
	font = (typeof(font) === 'string' && font.trim().length) ? font.trim() : '';
	
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
	count = (typeof(count) === 'number' && count > 0) ? count : 1;
	
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
		"fill" : formArraySpace(randomPersonList(5)),
		"info" : formObjectSpace({
			"Platform": process.platform,
			"Architecture": process.arch,
			"CPU": os.cpus()[ 0 ].model,
			"Free memory": bytesToSize(os.freemem())
		}),
		"dir" : `Full path to file: ${ __filename }`
	}
	
	const commandString = command.toString().trim();
	
	process.stdout.write(horizontalLine());
	process.stdout.write(
		centeredText(
			"\033[1m \x1b[32m " + letterSpaceSeparator( commandString.toUpperCase() , 1) + " \x1b[0m"
		)
	);
	process.stdout.write(horizontalLine());
	
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
		return "Command not found, use 'help' to select command from list"
	}
}


/****************************/


function terminalQuestion() {
	function ask(text) {
		process.stdout.write(`\n ${ textFontSetting } ${ textColorSetting } ${ text } \x1b[0m` );
		process.stdout.write(`\n > `);
	}
	
	process.stdin.on('data', function (data) {
		ask(commandList(data));
	});
	
	ask("Enter the command or use the command 'help'");
}

terminalQuestion();

