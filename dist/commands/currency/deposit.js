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
const deposit = {
    name: 'deposit',
    description: 'Transfers money to another user.',
    usage: ['@User', '[amount]'],
    execute: ({ author, args, message, channel }) => __awaiter(void 0, void 0, void 0, function* () {
        const amount = parseInt(args[1]);
        if (!amount || amount <= 0) {
            channel.send('You must enter a valid amount!');
            return;
        }
        const victim = message.mentions.users.first();
        if (!victim) {
            channel.send('You must mention someone to deposit the money lmao');
            return;
        }
        if ((yield author.getBalance()) < amount) {
            channel.send("You don't have that much money, lmao you're broke");
            return;
        }
        yield author.add(-amount);
        yield victim.add(amount);
        channel.send(`Successfully transferred ${utils_1.asCurrency(amount)} to \`${victim.tag}\`!`);
    }),
};
exports.default = deposit;
