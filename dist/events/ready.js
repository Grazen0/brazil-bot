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
const chalk_1 = __importDefault(require("chalk"));
const config_json_1 = __importDefault(require("../config.json"));
exports.default = (client) => {
    const { user } = client;
    if (!user)
        return;
    user.setActivity(config_json_1.default.activity);
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        const tickets = yield client.models.UserTickets.findAll();
        const guild = client.guilds.cache.get(config_json_1.default.mainGuild);
        const now = Date.now();
        if (guild) {
            for (const { user_id, until } of tickets) {
                if (until > now)
                    continue;
                const member = guild.member(user_id);
                if (!member)
                    continue;
                yield member.roles.remove(config_json_1.default.brazilRole);
                yield client.models.UserTickets.destroy({ where: { user_id } });
            }
        }
    }), config_json_1.default.expireCheckInterval * 1000);
    client.guilds.cache.forEach(guild => { var _a, _b; return (_b = (_a = guild.me) === null || _a === void 0 ? void 0 : _a.voice.channel) === null || _b === void 0 ? void 0 : _b.leave(); });
    console.log(chalk_1.default.blue(`Logged in as ${user.tag}!`));
};
