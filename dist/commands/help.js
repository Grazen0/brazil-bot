"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_json_1 = __importDefault(require("../config.json"));
const help = {
    name: 'help',
    description: "Shows this bot's command list.",
    usage: ['(command)'],
    aliases: ['commands'],
    execute: ({ channel, client, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const command = client.findCommand(args[0] || '');
        if (!command) {
            channel.send(new discord_js_1.MessageEmbed()
                .setTitle("Brazil Bot's commands")
                .setColor(config_json_1.default.embedColor)
                .setDescription(`\`\`\`${client.commands
                .filter(({ description }) => description !== '')
                .map(({ name, description }) => `${name} - ${description}`)
                .join('\n')}\`\`\``)
                .setFooter(`(Use "${config_json_1.default.prefix}" before each command!)`));
            return;
        }
        const { name, description, aliases = [], permissions = [], usage = [], } = command;
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(`Command: \`${name}\``)
            .setColor(config_json_1.default.embedColor)
            .setDescription(description)
            .addField('Usage:', '`' +
            config_json_1.default.prefix +
            name +
            (usage.length ? ` ${usage.join(' ')}` : '') +
            '`');
        if (aliases.length) {
            embed.addField('Aliases:', aliases.map(alias => `\`${alias}\``).join(', '), false);
        }
        if (permissions.length) {
            embed.addField('Required permissions:', permissions.map(perm => `\`${perm}\``).join(', '), false);
        }
        channel.send(embed);
    }),
};
exports.default = help;
