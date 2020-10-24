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
exports.default = ({ UserCurrency }) => {
    discord_js_1.User.prototype.getBalance = function () {
        return __awaiter(this, void 0, void 0, function* () {
            return ((yield UserCurrency.findByPk(this.id)) || { balance: 0 }).balance;
        });
    };
    discord_js_1.User.prototype.add = function (amount = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            let bal = yield this.getBalance();
            bal = Math.max(bal + amount, 0);
            yield UserCurrency.upsert({
                user_id: this.id,
                balance: bal,
            });
            return bal;
        });
    };
};
