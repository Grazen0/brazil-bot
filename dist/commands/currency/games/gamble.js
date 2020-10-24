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
const gamble = {
    name: 'gamble',
    description: 'Gamble for $500',
    execute: ({ channel, author, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const bal = yield author.getBalance();
        const { gambleReward, gamblePrice, embedColor } = config_json_1.default;
        if (bal < gamblePrice) {
            channel.send(`You don't have enough money lol, you need ${utils_1.asCurrency(gamblePrice)}`);
            return;
        }
        yield author.add(-gamblePrice);
        const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣'];
        const message = yield channel.send(new discord_js_1.MessageEmbed()
            .setTitle('Gamble!')
            .setColor(embedColor)
            .setDescription(`React with any of these emojis for a chance of winning ${utils_1.asCurrency(gambleReward)}!`));
        Promise.all(emojis.map(emoji => message.react(emoji)));
        const filter = ({ emoji }, user) => user.id === author.id && emojis.includes(emoji.name);
        yield message.awaitReactions(filter, {
            max: 1,
            time: 20000,
        });
        if (Math.random() < 1 / emojis.length) {
            yield author.add(gambleReward);
            yield client.log(`${author.tag} won a gamble`);
            channel.send(`Congratulations, you win ${utils_1.asCurrency(gambleReward)}!`);
        }
        else {
            channel.send('Oof, you lost. Better luck next time!');
        }
    }),
};
exports.default = gamble;
