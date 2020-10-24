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
const getPrice = () => config_json_1.default.ticketPrice *
    (new Date().getDay() === 0
        ? config_json_1.default.sundayDiscount
        : 1);
const ticket = {
    name: 'ticket',
    description: `Buy a ticket to brazil for ${utils_1.asCurrency(getPrice())}!`,
    execute: ({ channel, author, client, member }) => __awaiter(void 0, void 0, void 0, function* () {
        if (yield client.models.UserTickets.findByPk(author.id)) {
            channel.send('You already have the Brazil role, dummy');
            return;
        }
        const price = getPrice();
        const bal = yield author.getBalance();
        if (price > bal) {
            channel.send("You don't have enough money lol");
            return;
        }
        yield author.add(-price);
        yield client.models.UserTickets.upsert({
            user_id: author.id,
            until: Date.now() + 1000 * 60 * 60 * 24,
        });
        yield member.roles.add(config_json_1.default.brazilRole);
        yield client.log(`${author.tag} bought a ticket to Brazil for ${utils_1.asCurrency(price)}`);
        author.send(`You bough a ticket to Brazil for one day (${utils_1.asCurrency(price)}). Enjoy your trip!`);
    }),
};
exports.default = ticket;
