"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_json_1 = __importDefault(require("../config.json"));
exports.default = (client, message) => {
    const { content, author, member, channel, guild } = message;
    const { prefix } = config_json_1.default;
    if (!guild ||
        author.bot ||
        !member ||
        !(channel instanceof discord_js_1.TextChannel) ||
        !content.toLowerCase().startsWith(prefix.toLowerCase()))
        return;
    const [search, ...args] = content.slice(prefix.length).split(/\s+/);
    const command = client.findCommand(search || '');
    if (!command)
        return;
    const { permissions = [], name, cooldown = 0 } = command;
    if (!member.hasPermission(permissions) &&
        !config_json_1.default.owners.includes(author.id)) {
        channel.send(`You need the following permissions to run this command: \`${permissions
            .map(perm => `\`${perm}\``)
            .join(', ')}\``);
        return;
    }
    if (!author.lastCommand)
        author.lastCommand = {};
    const now = Date.now();
    const diff = now - (author.lastCommand[name] || 0);
    if (diff < cooldown) {
        channel.send(`Hold up! You have to wait \`${Math.floor((cooldown - diff) / 10) / 100}s\` before using this command!`);
        return;
    }
    author.lastCommand[name] = now;
    command
        .execute({
        author,
        member,
        args,
        guild,
        client,
        message,
        channel,
    })
        .catch(console.error);
};
