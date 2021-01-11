const os = require('os');

const { writeAskTemplate, writeTemplateHeader } = require("./components/writeTemplates");
const { formObjectSpace, formArraySpace, warningMessage } = require("./components/interface");
const { randomPersonList } = require("./components/dataGenerator");
const { textSettings } = require("./components/textSettings");
const { bytesToSize } = require("./components/helpers");


function commandList(command) {
	const commandsList = {
		"help" : formObjectSpace({
			"author" : "developer of the program",
			"dir" : "full path to the main file",
			"exit" : "exit from the program",
			"fill" : "filling an array of fake user data",
			"help" : "The list of available commands",
			"info" : "technical information about the server (computer)",
			"settings" : 'change the settings of the text design (--color="blue", --font="bold")\x1b[32m settings --color="cyan"  settings --font="underline"\x1b[0m',
			"version" : "version of product"
		}),
		"version" : "v1.0.0",
		"author" : "Kirill Bukovski",
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
	const regexSettings = new RegExp(/settings --(font|color)+="(.*)"/g);
	
	writeTemplateHeader(commandString);
	
	if (commandsList[ commandString ]) {
		return commandsList[ commandString ];
	} else if (regexSettings.test(commandString)) {
		const textSettingName = commandString.replace(regexSettings, "$1,$2").toLowerCase();
		const splitTextSettings = textSettingName.split(",");
		const [ category, setting ] = splitTextSettings;
		
		return textSettings(category, setting)
	}	else if (commandString.includes("settings")) {
		return warningMessage("use one of available commands 'settings --color=' or 'settings --font='")
	}	else if (commandString === "exit") {
		process.on('exit', function () {
			process.stdout.write("Goodbye, terminal is not available");
		});
		
		process.exit(1);
	} else {
		return warningMessage("Command not found, use 'help' to select command from list");
	}
}


function runTerminal() {
	process.stdin.on('data', function (data) {
		writeAskTemplate(commandList(data));
	});
	
	writeAskTemplate("Enter the command or use the command 'help'");
}

runTerminal();

