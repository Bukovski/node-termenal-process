const { horizontalLine, letterSpaceSeparator, centeredText  } = require("./interface");
const { fontSetting, colorSetting  } = require("./textSettings");


function writeAskTemplate(text) {
	process.stdout.write(`\n ${ fontSetting() } ${ colorSetting() } ${ text } \x1b[0m` );
	process.stdout.write(`\n > `);
}

function writeTemplateHeader(commandString) {
	process.stdout.write(horizontalLine());
	process.stdout.write(
		centeredText(
			"\033[1m \x1b[32m " + letterSpaceSeparator( commandString.toUpperCase() , 1) + " \x1b[0m"
		)
	);
	process.stdout.write(horizontalLine());
}


module.exports = {
	writeAskTemplate,
	writeTemplateHeader,
}