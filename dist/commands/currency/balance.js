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
const utils_1 = require("../../util/utils");
const balance = {
    name: 'balance',
    description: 'Shows your current balance.',
    aliases: ['bal'],
    usage: ['(@User)'],
    execute: ({ author, message: { mentions }, channel }) => __awaiter(void 0, void 0, void 0, function* () {
        const user = mentions.users.first() || author;
        if (user.bot) {
            channel.send('The mentioned user is a bot!');
            return;
        }
        const bal = yield user.getBalance();
        channel.send(`${user.id === author.id ? 'Your' : `\`${user.tag}\`'s`} balance: ${utils_1.asCurrency(bal)}`);
    }),
};
exports.default = balance;
