const fs = require('fs');
const path = require('path');

const listAll = folder =>
	fs.readdirSync(folder).reduce((acc, file) => {
		const filePath = path.join(folder, file);
		return [
			...acc,
			...(fs.statSync(filePath).isDirectory() ? listAll(filePath) : [filePath]),
		];
	}, []);

const asCurrency = amount =>
	amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

module.exports = {
	listAll,
	asCurrency,
};
