"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./util/utils");
const sequelize_1 = require("sequelize");
const Client_1 = __importDefault(require("./util/extensions/Client"));
const User_1 = __importDefault(require("./util/extensions/User"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserCurrency_1 = __importDefault(require("./models/UserCurrency"));
const UserTickets_1 = __importDefault(require("./models/UserTickets"));
const Logs_1 = __importDefault(require("./models/Logs"));
dotenv_1.default.config();
const client = new discord_js_1.Client();
(() => __awaiter(void 0, void 0, void 0, function* () {
    client.commands = (yield Promise.all(utils_1.listAll(path_1.default.join(__dirname, 'commands'))
        .filter(path => /\.(js|ts)$/i.test(path))
        .map(file => Promise.resolve().then(() => __importStar(require(file))))))
        .map(imported => imported.default)
        .filter(command => command === null || command === void 0 ? void 0 : command.name);
    utils_1.listAll(path_1.default.join(__dirname, 'events')).forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
        const moduleName = file
            .split(/(\\|\/)/)
            .slice(-1)[0]
            .replace(/\.(js|ts)$/i, '');
        const eventName = (moduleName.match(/-[a-z]/g) || []).reduce((acc, match) => acc.replace(match, match.charAt(1).toUpperCase()), moduleName);
        const func = (yield Promise.resolve().then(() => __importStar(require(file)))).default;
        client.on(eventName, (...args) => func(client, ...args));
    }));
    const sequelize = new sequelize_1.Sequelize({
        host: 'sql10.freemysqlhosting.net',
        database: 'sql10372189',
        username: 'sql10372189',
        password: process.env.DB_PASSWORD,
        port: 3306,
        dialect: 'mysql',
        logging: false,
    });
    console.log(chalk_1.default.cyan('Connecting to database...'));
    client.models = {
        UserCurrency: UserCurrency_1.default(sequelize),
        UserTickets: UserTickets_1.default(sequelize),
        Logs: Logs_1.default(sequelize),
    };
    try {
        yield sequelize.authenticate();
        yield sequelize.sync({
            force: process.argv.some(arg => arg.toLowerCase() === '--force'),
        });
        client.sequelize = sequelize;
        Client_1.default();
        User_1.default(client.models.UserCurrency);
        const { TOKEN } = process.env;
        console.log(chalk_1.default.yellow(`Logging in...`));
        client.login(TOKEN);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}))();
