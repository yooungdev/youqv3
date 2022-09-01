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
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRouter = void 0;
const createRouter_1 = require("../../createRouter");
const zod_1 = require("zod");
const trpc = __importStar(require("@trpc/server"));
const events_1 = require("../../../constants/events");
exports.questionRouter = (0, createRouter_1.createRouter)()
    .mutation('getAll', {
    input: zod_1.z.object({
        limit: zod_1.z.number()
    }),
    async resolve({ ctx, input }) {
        return await ctx.prisma.question.findMany({
            take: input.limit,
            include: {
                author: true,
                answers: true
            },
            orderBy: {
                id: 'desc'
            }
        });
    }
})
    .mutation('getOne', {
    input: zod_1.z.object({
        id: zod_1.z.number() || zod_1.z.undefined()
    }),
    async resolve({ ctx, input }) {
        return await ctx.prisma.question.findUnique({
            where: {
                id: input.id
            },
            include: {
                answers: {
                    include: {
                        comments: {
                            include: {
                                author: true
                            }
                        },
                        author: true
                    },
                    orderBy: {
                        id: 'desc'
                    }
                },
                comments: {
                    include: {
                        author: true
                    }
                },
                author: true
            }
        });
    }
})
    .subscription('onCreateAnswer', {
    input: zod_1.z.any(),
    async resolve({ ctx, input }) {
        return new trpc.Subscription((emit) => {
            const onAnswer = (data) => {
                if (input.questionId === data.questionId) {
                    emit.data(data);
                }
            };
            ctx.ee.on(events_1.Events.CREATE_ANSWER, onAnswer);
            return () => {
                ctx.ee.off(events_1.Events.CREATE_ANSWER, onAnswer);
            };
        });
    }
})
    .subscription('onCreateCommentQuestion', {
    input: zod_1.z.any(),
    async resolve({ ctx, input }) {
        return new trpc.Subscription((emit) => {
            const onCommentQuestion = (data) => {
                if (data.questionId === input.questionId) {
                    emit.data(data);
                }
            };
            ctx.ee.on(events_1.Events.CREATE_COMMENT_QUESTION, onCommentQuestion);
            return () => {
                ctx.ee.off(events_1.Events.CREATE_COMMENT_QUESTION, onCommentQuestion);
            };
        });
    }
})
    .subscription('onCreateCommentAnswer', {
    input: zod_1.z.object({
        answerId: zod_1.z.number()
    }),
    async resolve({ ctx, input }) {
        return new trpc.Subscription((emit) => {
            const onCommentAnswer = (data) => {
                if (data.answerId === input.answerId) {
                    emit.data(data);
                }
            };
            ctx.ee.on(events_1.Events.CREATE_COMMENT_ANSWER, onCommentAnswer);
            return () => {
                ctx.ee.off(events_1.Events.CREATE_COMMENT_ANSWER, onCommentAnswer);
            };
        });
    }
});
// .subscription('onGetOne', {
//     input: z.object({
//         id: z.number() || z.undefined()
//     }),
//     async resolve({ ctx, input }) {
//         return new trpc.Subscription<any>((emit: any) => {
//             const on = (data: any) => {
//                 emit.data(data)
//             }
//             ctx.ee.on('GET-ONE', on)
//             return () => {
//                 ctx.ee.off('GET-ONE', on)
//             }
//         })
//     }
// })
