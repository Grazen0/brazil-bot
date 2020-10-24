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
const discord_js_1 = require("discord.js");
exports.default = () => {
    discord_js_1.Client.prototype.commands = [];
    discord_js_1.Client.prototype.findCommand = function (search = '') {
        if (!search)
            return;
        return this.commands.find(({ name = '', aliases = [] }) => name.toLowerCase() === search.toLowerCase() ||
            aliases.some(alias => alias.toLowerCase() === search.toLowerCase()));
    };
    discord_js_1.Client.prototype.log = function (message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message)
                throw new Error('Cannot log empty message');
            yield this.models.Logs.create({
                message,
                date: Date.now(),
            });
        });
    };
};
