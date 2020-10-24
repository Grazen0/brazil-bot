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
const weekly = {
    name: 'weekly',
    description: 'Claim your weekly reward!',
    execute: ({ channel, author, client }) => __awaiter(void 0, void 0, void 0, function* () {
        const now = Date.now();
        const diff = now -
            ((yield client.models.UserCurrency.findByPk(author.id)) || {
                last_weekly: 0,
            }).last_weekly;
        const WEEK_MILLIS = 1000 * 60 * 60 * 24 * 7;
        if (diff < WEEK_MILLIS) {
            const rest = WEEK_MILLIS - diff;
            const days = Math.floor(rest / (1000 * 60 * 60 * 24));
            const hours = Math.floor(rest / (1000 * 60 * 60)) - days * 24;
            const minutes = Math.floor(rest / (1000 * 60)) - hours * 60 - days * 24 * 60;
            channel.send(`You have to wait ${days} days, ${hours} hours and ${minutes} minutes before claiming your reward!`);
            return;
        }
        const { weeklyReward } = config_json_1.default;
        yield author.add(weeklyReward);
        yield client.models.UserCurrency.upsert({
            user_id: author.id,
            last_weekly: now,
        });
        channel.send(`You have received \`${utils_1.asCurrency(weeklyReward)}\`!`);
    }),
};
exports.default = weekly;
