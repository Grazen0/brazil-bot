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
const logs = {
    name: 'logs',
    description: "Shows the bot's logs.",
    permissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
    execute: ({ channel, author, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const logs = yield client.models.Logs.findAll();
        if (!logs.length) {
            channel.send('There are currently no logs!');
            return;
        }
        const rows = logs.map(({ date, message }) => {
            const d = new Date(date);
            return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} - ${message}`;
        });
        yield author.send(new discord_js_1.MessageEmbed()
            .setTitle('Brazil Bot logs:')
            .setColor(config_json_1.default.embedColor)
            .setDescription(rows.join('\n')));
        channel.send('Logs sent!');
    }),
};
exports.default = logs;
