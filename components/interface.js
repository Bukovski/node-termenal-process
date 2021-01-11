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

function warningMessage (message) {
	return "\033[1m \x1b[31m Warning! \x1b[0m" + message;
}


module.exports = {
	warningMessage,
	letterSpaceSeparator,
	horizontalLine, centeredText,
	formObjectSpace, formArraySpace,
}