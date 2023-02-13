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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onReady = void 0;
var rest_1 = require("@discordjs/rest");
var discord_js_1 = require("discord.js");
var v9_1 = require("discord-api-types/v9");
var node_fetch_1 = __importDefault(require("node-fetch"));
var fs_1 = __importDefault(require("fs"));
var commands_1 = require("../commands");
function getLatestDeprem() {
    return __awaiter(this, void 0, void 0, function () {
        var data, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, node_fetch_1.default)("https://api.orhanaydogdu.com.tr/deprem/live.php")];
                case 1:
                    data = _a.sent();
                    return [4 /*yield*/, data.json()];
                case 2:
                    json = _a.sent();
                    return [2 /*return*/, json.result[0]];
            }
        });
    });
}
function start(client) {
    return __awaiter(this, void 0, void 0, function () {
        var lowChannel, highChannel;
        var _this = this;
        return __generator(this, function (_a) {
            console.log("started deprem");
            lowChannel = client.channels.cache.get(process.env.LOW_CHANNEL_ID);
            highChannel = client.channels.cache.get(process.env.HIGH_CHANNEL_ID);
            setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                var latestDeprem, file, latest, depremEmbed, channel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("checking deprem");
                            return [4 /*yield*/, getLatestDeprem()];
                        case 1:
                            latestDeprem = _a.sent();
                            return [4 /*yield*/, fs_1.default.readFileSync("latest.json", "utf-8")];
                        case 2:
                            file = _a.sent();
                            if (!file)
                                throw new Error("latest.json not found!");
                            latest = JSON.parse(file);
                            if (!((latest === null || latest === void 0 ? void 0 : latest.date) != (latestDeprem === null || latestDeprem === void 0 ? void 0 : latestDeprem.date))) return [3 /*break*/, 5];
                            console.log("Deprem var!", latestDeprem);
                            return [4 /*yield*/, fs_1.default.writeFileSync("latest.json", JSON.stringify(latestDeprem))];
                        case 3:
                            _a.sent();
                            depremEmbed = new discord_js_1.EmbedBuilder()
                                .setTitle("Deprem Bilgileri")
                                .setColor(0x0099FF)
                                .setTimestamp()
                                .addFields({ name: "Lokasyon", value: latestDeprem.lokasyon.toString() }, { name: "Şiddet", value: latestDeprem.mag.toString() }, { name: "Tarih", value: latestDeprem.date.toString() }, { name: "Enlem", value: latestDeprem.coordinates[0].toString(), inline: true }, { name: "Boylam", value: latestDeprem.coordinates[1].toString(), inline: true }, { name: "Derinlik", value: latestDeprem.depth.toString(), inline: true })
                                .setFooter({ text: "Deprem Botu" });
                            channel = latestDeprem.mag > 4 ? highChannel : lowChannel;
                            return [4 /*yield*/, channel.send({ embeds: [depremEmbed] })];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            console.log("Deprem yok!");
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            }); }, 30000);
            return [2 /*return*/];
        });
    });
}
function onReady(client) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var rest, commandData;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    rest = new rest_1.REST({ version: "9" }).setToken(process.env.BOT_TOKEN);
                    commandData = commands_1.CommandList.map(function (command) { return command.data.toJSON(); });
                    return [4 /*yield*/, rest.put(v9_1.Routes.applicationGuildCommands(((_a = client.user) === null || _a === void 0 ? void 0 : _a.id) || "missing id", process.env.GUILD_ID), { body: commandData })];
                case 1:
                    _d.sent();
                    (_b = client.user) === null || _b === void 0 ? void 0 : _b.setActivity("Deprem", { type: discord_js_1.ActivityType.Playing });
                    (_c = client.user) === null || _c === void 0 ? void 0 : _c.setStatus("online");
                    start(client);
                    console.log("Discord ready!");
                    return [2 /*return*/];
            }
        });
    });
}
exports.onReady = onReady;
;
