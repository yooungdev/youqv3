"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const client_1 = require("@prisma/client");
const react_1 = require("next-auth/react");
const events_1 = __importDefault(require("events"));
const prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
});
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
const ee = new events_1.default();
const createContext = async ({ req, res, }) => {
    const session = await (0, react_1.getSession)({ req });
    return {
        req,
        res,
        prisma,
        session,
        ee,
    };
};
exports.createContext = createContext;
