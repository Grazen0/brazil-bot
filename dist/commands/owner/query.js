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
const query = {
    name: 'query',
    description: '',
    execute: ({ channel, args, author, client }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!config_json_1.default.owners.includes(author.id)) {
            channel.send("You don't have permission to use this command!");
            return;
        }
        try {
            const [results] = yield client.sequelize.query(args.join(' '));
            channel.send(new discord_js_1.MessageEmbed()
                .setColor('6bf553')
                .setTitle('Query Results')
                .setDescription(`\`\`\`${JSON.stringify(results, null, 2)}\`\`\``));
        }
        catch (err) {
            channel.send(new discord_js_1.MessageEmbed()
                .setColor('ff5252')
                .setTitle('Error!')
                .setDescription(err));
        }
    }),
};
exports.default = query;
