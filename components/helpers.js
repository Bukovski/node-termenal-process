module.exports.bytesToSize = function (bytes) {
	if (bytes === 0) return 'n/a'
	
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	const splitBytesIntoDots = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
	if (splitBytesIntoDots === 0) return `${ bytes } ${ sizes[ splitBytesIntoDots ] })`;
	
	return `${ (bytes / (1024 ** splitBytesIntoDots)).toFixed(1) } ${ sizes[ splitBytesIntoDots ] }`;
}
