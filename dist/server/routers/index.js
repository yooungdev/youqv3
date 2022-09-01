"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const superjson_1 = __importDefault(require("superjson"));
//
const createRouter_1 = require("../createRouter");
// routers
const question_1 = require("./question/question");
const profile_1 = require("./profile/profile");
const questionProtected_1 = require("./question/questionProtected");
exports.appRouter = (0, createRouter_1.createRouter)()
    .transformer(superjson_1.default)
    .merge('question.', question_1.questionRouter)
    .merge('question_protected.', questionProtected_1.questionRouterProtected)
    .merge('profile.', profile_1.profileRouter);
