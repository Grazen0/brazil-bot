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
const config_json_1 = __importDefault(require("../../config.json"));
const utils_1 = require("../../util/utils");
const bestow = {
    name: 'bestow',
    description: '',
    aliases: ['give', 'gift'],
    execute: ({ author, channel, args, message }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!config_json_1.default.owners.includes(author.id)) {
            channel.send("You don't have permission for this!");
            return;
        }
        const reward = parseInt(args[1]);
        const member = message.mentions.users.first();
        if (isNaN(reward)) {
            channel.send('Please add a valid number');
            return;
        }
        if (!member) {
            channel.send('pls mention a user');
            return;
        }
        yield member.add(reward);
        channel.send(`${member} received \`${utils_1.asCurrency(reward)}\``);
    }),
};
exports.default = bestow;
