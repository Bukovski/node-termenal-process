const { warningMessage } = require("./interface");



let textColorSetting = "\x1b[0m";
// settings --color="cyan"
// settings --color="crimson"
// settings --color=""

let textFontSetting = "\033[22m";
// settings --font="bold"
// settings --font="underline"


function textSettings(settingCategory, fontSetting) {
	settingCategory = (typeof(settingCategory) === 'string' && settingCategory.trim().length && (settingCategory === "color" || settingCategory === "font")) ? settingCategory.trim() : 'colors';
	fontSetting = (typeof(fontSetting) === 'string' && fontSetting.trim().length) ? fontSetting.trim() : '';
	
	const settings = {
		color:  {
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
		},
		font:  {
			bold : '\033[1m',
			italic : '\033[3m',
			underline : '\033[4m',
			normal : '\033[22m'
		}
	}
	
	const category = settings[ settingCategory ];
	
	if (!category[ fontSetting ]) {
		const fontList = Object.keys(category).join(", ");
		
		return warningMessage(`Select value from the list available: ${ fontList }`);
	} else if (settingCategory === "color") {
		textColorSetting = category[ fontSetting ];
	} else if (settingCategory === "font") {
		textFontSetting = category[ fontSetting ]
	}
	
	return `Text ${ settingCategory } has been changed to ${ fontSetting.toUpperCase() }`;
}


module.exports = {
	colorSetting: () => textColorSetting,
	fontSetting: () => textFontSetting,
	textSettings
}