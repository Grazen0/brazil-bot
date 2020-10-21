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

declare module 'discord.js' {

  interface Client {
    commands: Command[];
    findCommand(search: string): Command | undefined;
    sequelize: import('sequelize').Sequelize;
    models: {
      UserCurrency: ReturnType<typeof import('./models/UserCurrency')>;
    }
  }

  interface User {
    lastCommand: {
      [key: string]: number;
    }

    getBalance(): Promise<number>;
    add(amount: number): Promise<number>;
  }
}
