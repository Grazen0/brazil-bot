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
const time = {
    name: 'time',
    description: 'Shows your time left in Brazil',
    execute: ({ author, channel, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield client.models.UserTickets.findByPk(author.id);
        if (!result) {
            channel.send("You don't have any tickets to Brazil lmao");
            return;
        }
        const rest = result.until - Date.now();
        const hours = Math.floor(rest / 3600000);
        const minutes = Math.floor(rest / 60000) - hours * 60;
        channel.send(`You have ${hours} hours and ${minutes} minutes left in Brazil.`);
    }),
};
exports.default = time;
