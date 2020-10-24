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
const rickRoll = {
    name: 'rule34',
    description: '...',
    usage: ['(tag1)', '(tag2)', '...'],
    execute: ({ channel, client, author }) => __awaiter(void 0, void 0, void 0, function* () {
        yield channel.send(new discord_js_1.MessageEmbed()
            .setTitle('SIKE')
            .setImage('https://media1.tenor.com/images/467d353f7e2d43563ce13fddbb213709/tenor.gif?itemid=12136175')
            .setColor(config_json_1.default.embedColor));
        client.log(`${author.tag} got rickrolled.`);
    }),
};
exports.default = rickRoll;
