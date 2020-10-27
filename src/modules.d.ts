interface CommandEvent {
	message: import('discord.js').Message;
	guild: import('discord.js').Guild;
	channel: import('discord.js').TextChannel;
	member: import('discord.js').GuildMember;
	author: import('discord.js').User;
	client: import('discord.js').Client;
	args: string[];
}

interface Command {
	name: string;
	description: string;
	aliases?: string[];
	cooldown?: number;
	usage?: string[];
	permissions?: import('discord.js').PermissionResolvable[];
	execute: (e: CommandEvent) => Promise<void>;
}

interface Models {
	UserCurrency: ReturnType<typeof import('./models/UserCurrency').default>;
	UserTickets: ReturnType<typeof import('./models/UserTickets').default>;
	Logs: ReturnType<typeof import('./models/Logs').default>;
}

declare module 'discord.js' {
	interface Client {
		commands: Command[];
		findCommand(search: string): Command | undefined;
		sequelize: import('sequelize').Sequelize;
		log(message: string): Promise<void>;
		models: Models;
	}

	interface User {
		lastCommand: {
			[key: string]: number;
		};

		getBalance(): Promise<number>;
		add(amount: number): Promise<number>;
	}
}
