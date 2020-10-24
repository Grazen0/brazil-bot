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
const pray = {
    name: 'pray',
    description: 'Pray to the Brazil gods in exchange for a reward.',
    cooldown: 300000,
    execute: ({ author, channel }) => __awaiter(void 0, void 0, void 0, function* () {
        const { min, max } = config_json_1.default.prayReward;
        const reward = Math.floor(Math.random() * (max - min)) + min;
        yield author.add(reward);
        channel.send(`You prayed to the gods and received \`${utils_1.asCurrency(reward)}\``);
    }),
};
exports.default = pray;
