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
const ytdl_core_discord_1 = __importDefault(require("ytdl-core-discord"));
const discord_js_1 = require("discord.js");
const music = {
    name: 'music',
    description: 'Plays random Brazilian music.',
    execute: ({ author, guild, client, channel }) => __awaiter(void 0, void 0, void 0, function* () {
        const { me, channels } = guild;
        const { songs, musicChannel } = config_json_1.default;
        const vc = channels.cache.get(musicChannel);
        if (!me || !(vc instanceof discord_js_1.VoiceChannel))
            return;
        if (!(yield client.models.UserTickets.findByPk(author.id))) {
            channel.send("You can't do this outside Brazil lol");
            return;
        }
        const { voice } = me;
        if (voice.channel) {
            channel.send("I'm already playing music!");
            return;
        }
        try {
            const connection = yield vc.join();
            voice.setDeaf(true);
            const song = songs[Math.floor(Math.random() * songs.length)];
            if (!song)
                return;
            const dispatcher = connection.play(yield ytdl_core_discord_1.default(song, {
                filter: 'audioonly',
            }), { type: 'opus' });
            dispatcher.on('finish', vc.leave);
            channel.send(`**Now playing:** ${song}`);
        }
        catch (err) {
            console.error(err);
            vc.leave();
            channel.send('A weird error occurred! Tell the devs about this pls');
        }
    }),
};
exports.default = music;
