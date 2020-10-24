"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asCurrency = exports.listAll = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.listAll = (folder) => fs_1.default.readdirSync(folder).reduce((acc, file) => {
    const filePath = path_1.default.join(folder, file);
    return [
        ...acc,
        ...(fs_1.default.statSync(filePath).isDirectory() ? exports.listAll(filePath) : [filePath]),
    ];
}, []);
exports.asCurrency = (amount) => amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
