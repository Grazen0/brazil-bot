"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_json_1 = __importDefault(require("../config.json"));
exports.default = (client, prevMember, member) => {
    const { brazilRole, brazilChannel } = config_json_1.default;
    const { guild, id, roles: { cache }, } = member;
    const prevRole = prevMember.roles.cache.get(brazilRole);
    const newRole = cache.get(brazilRole);
    if (!prevRole && newRole) {
        const channel = guild.channels.cache.get(brazilChannel);
        if (!channel || !(channel instanceof discord_js_1.TextChannel))
            return;
        channel.send(`<@${id}>, welcome to Brazil!`);
    }
    else if (prevRole && !newRole) {
        member.user.send('Your visit to Brazil has ended. We hope you come back soon!');
    }
};
