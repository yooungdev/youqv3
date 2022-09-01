"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.authOptions = void 0;
const next_auth_1 = __importDefault(require("next-auth"));
const github_1 = __importDefault(require("next-auth/providers/github"));
// Prisma adapter for NextAuth, optional and can be removed
const prisma_adapter_1 = require("@next-auth/prisma-adapter");
const client_1 = require("@prisma/client");
const Vk_1 = __importDefault(require("./Vk"));
const prisma = new client_1.PrismaClient();
exports.authOptions = {
    // Include user.id on session
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
                session.user.isAdmin = user.isAdmin;
                session.user.level = user.level;
                session.user.isConfirmed = user.isConfirmed;
            }
            return session;
        },
    },
    // Configure one or more authentication providers
    adapter: (0, prisma_adapter_1.PrismaAdapter)(prisma),
    providers: [
        (0, github_1.default)({
            clientId: "71368b02fd7a5d4f93a2",
            clientSecret: "79f8294473e6e2174b0ba906517c06565efb21b7",
        }),
        (0, Vk_1.default)({
            clientId: (_a = process.env.VK_ID) !== null && _a !== void 0 ? _a : '',
            clientSecret: (_b = process.env.VK_SECRET) !== null && _b !== void 0 ? _b : '',
        }),
    ],
};
exports.default = (0, next_auth_1.default)(exports.authOptions);
