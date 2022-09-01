"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRouterProtected = void 0;
const createRouterProtected_1 = require("../../createRouterProtected");
const zod_1 = require("zod");
const events_1 = require("../../../constants/events");
exports.questionRouterProtected = (0, createRouterProtected_1.createRouterProtected)()
    .mutation('create_question', {
    input: zod_1.z.object({
        text: zod_1.z.string(),
        textHtml: zod_1.z.string(),
        item: zod_1.z.string(),
        class: zod_1.z.string()
    }),
    async resolve({ ctx, input }) {
        var _a, _b;
        const savedQuestion = await ctx.prisma.question.create({
            data: {
                text: input.text,
                textHtml: input.textHtml,
                item: input.item,
                class: input.class,
                author: { connect: { id: (_b = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.session) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id } }
            }
        });
        return savedQuestion;
    }
})
    .mutation("create_answer", {
    input: zod_1.z.object({
        text: zod_1.z.string(),
        textHtml: zod_1.z.string(),
        questionId: zod_1.z.number() || zod_1.z.null() || zod_1.z.undefined(),
    }),
    async resolve({ ctx, input }) {
        var _a, _b, _c, _d;
        console.log(input);
        const answer = await ctx.prisma.answer.create({
            data: {
                text: input.text,
                textHtml: input.textHtml,
                question: { connect: { id: input.questionId } },
                author: { connect: { id: (_b = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.session) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id } },
            },
        });
        ctx.ee.emit(events_1.Events.CREATE_ANSWER, {
            ...answer,
            author: {
                ...(_c = ctx === null || ctx === void 0 ? void 0 : ctx.session) === null || _c === void 0 ? void 0 : _c.user
            }
        });
        return {
            ...answer,
            author: {
                ...(_d = ctx === null || ctx === void 0 ? void 0 : ctx.session) === null || _d === void 0 ? void 0 : _d.user
            }
        };
    },
})
    .mutation("create_comment_to_question", {
    input: zod_1.z.object({
        text: zod_1.z.string(),
        questionId: zod_1.z.number(),
    }),
    async resolve({ ctx, input }) {
        var _a, _b, _c, _d;
        const commentQuestion = await ctx.prisma.comment.create({
            data: {
                text: input.text,
                question: { connect: { id: input.questionId } },
                author: { connect: { id: (_b = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.session) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id } },
            },
        });
        ctx.ee.emit(events_1.Events.CREATE_COMMENT_QUESTION, {
            ...commentQuestion,
            author: {
                ...(_c = ctx === null || ctx === void 0 ? void 0 : ctx.session) === null || _c === void 0 ? void 0 : _c.user
            }
        });
        return {
            ...commentQuestion,
            author: {
                ...(_d = ctx === null || ctx === void 0 ? void 0 : ctx.session) === null || _d === void 0 ? void 0 : _d.user
            }
        };
    },
})
    .mutation("create_comment_to_answer", {
    input: zod_1.z.object({
        text: zod_1.z.string(),
        answerId: zod_1.z.number(),
    }),
    async resolve({ ctx, input }) {
        var _a, _b, _c, _d;
        const commentAnswer = await ctx.prisma.comment.create({
            data: {
                text: input.text,
                answer: { connect: { id: input.answerId } },
                author: { connect: { id: (_b = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.session) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id } },
            },
        });
        ctx.ee.emit(events_1.Events.CREATE_COMMENT_ANSWER, {
            ...commentAnswer,
            author: {
                ...(_c = ctx === null || ctx === void 0 ? void 0 : ctx.session) === null || _c === void 0 ? void 0 : _c.user,
            },
        });
        return {
            ...commentAnswer,
            author: {
                ...(_d = ctx === null || ctx === void 0 ? void 0 : ctx.session) === null || _d === void 0 ? void 0 : _d.user,
            },
        };
    },
});
