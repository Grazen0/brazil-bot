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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const clear = {
    name: 'clear',
    description: "Clears the bot's logs.",
    permissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
    execute: ({ channel, client, author }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(channel instanceof discord_js_1.TextChannel))
            return;
        const message = yield channel.send('Are you sure you want to clear the logs?');
        const emojis = ['✅', '❌'];
        yield Promise.all(emojis.map(emoji => message.react(emoji)));
        const filter = (reaction, user) => user.id === author.id && emojis.includes(reaction.emoji.name);
        const collected = yield message.awaitReactions(filter, {
            max: 1,
            time: 10000,
        });
        const reaction = collected.first();
        if (!reaction || reaction.emoji.name === '❌')
            return;
        yield client.models.Logs.destroy({ where: {}, truncate: true });
        channel.send('Logs cleared!');
    }),
};
exports.default = clear;
