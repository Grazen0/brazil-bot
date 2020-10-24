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
const config_json_1 = __importDefault(require("../../config.json"));
const shop = {
    name: 'shop',
    description: 'Shop for items',
    usage: ['(page)'],
    execute: ({ client, channel }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        channel.send(new discord_js_1.MessageEmbed()
            .setTitle("Brazil Bot's shop")
            .setColor(config_json_1.default.embedColor)
            .setThumbnail(((_a = client.user) === null || _a === void 0 ? void 0 : _a.displayAvatarURL({ dynamic: true, size: 1024 })) || '')
            .setDescription(`Buy a ticket **$${config_json_1.default.ticketPrice}** \`${config_json_1.default.prefix}ticket\`\nGamble **$500** \`${config_json_1.default.prefix}gamble\`\nNothing else right now`)
            .setFooter(`do ${config_json_1.default.prefix}shop (page number)`));
    }),
};
exports.default = shop;
