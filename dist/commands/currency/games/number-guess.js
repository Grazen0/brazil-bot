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
const config_json_1 = __importDefault(require("../../../config.json"));
const utils_1 = require("../../../util/utils");
const numberGuess = {
    name: 'number',
    description: 'Earn more money (doubles your gamble)',
    usage: ['(number)'],
    execute: ({ channel, author, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const bal = yield author.getBalance();
        const price = parseInt(args[0]);
        const reward = price * 3;
        const answer = Math.floor(Math.random() * 11).toString();
        if (!args.length) {
            channel.send(`You didn't mention your bid`);
            return;
        }
        if (!price || price <= 0) {
            channel.send('You must enter a valid amount!');
            return;
        }
        if (bal < price) {
            channel.send(`You don't have enough money lol, you need ${utils_1.asCurrency(price)}`);
            return;
        }
        yield channel.send(new discord_js_1.MessageEmbed()
            .setTitle(`Guess a number between 1 and 10 to get a prize of ${reward - price}!`)
            .setColor(config_json_1.default.embedColor));
        const filter = (message) => message.author.id === author.id;
        const collected = yield channel.awaitMessages(filter, {
            max: 1,
            time: 10000,
        });
        const res = collected.first();
        if (!res)
            return;
        if (res.content === answer) {
            yield author.add(reward);
            channel.send(`Correct! You won ${utils_1.asCurrency(price)}!`);
        }
        else {
            channel.send(`Better luck next time! The correct answer was ${answer}`);
        }
    }),
};
exports.default = numberGuess;
