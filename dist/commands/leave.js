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
const config_json_1 = __importDefault(require("../config.json"));
const leave = {
    name: 'leave',
    description: 'Instantly flight back from Brazil. (y tho?)',
    execute: ({ author, channel, client, member }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(yield client.models.UserTickets.findByPk(author.id))) {
            channel.send('You are not currently in Brazil!');
            return;
        }
        yield client.models.UserTickets.destroy({ where: { user_id: author.id } });
        yield member.roles.remove(config_json_1.default.brazilRole);
        yield client.log(`${author.tag} left Brazil with leave command.`);
    }),
};
exports.default = leave;
