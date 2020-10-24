import fs from 'fs';
import path from 'path';

export const listAll = (folder: string): string[] =>
	fs.readdirSync(folder).reduce<string[]>((acc, file) => {
		const filePath = path.join(folder, file);
		return [
			...acc,
			...(fs.statSync(filePath).isDirectory() ? listAll(filePath) : [filePath]),
		];
	}, []);

export const asCurrency = (amount: number) =>
	amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
