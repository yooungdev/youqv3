"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const zod_1 = require("zod");
const createRouter_1 = require("../../createRouter");
exports.profileRouter = (0, createRouter_1.createRouter)()
    .mutation('getOne', {
    input: zod_1.z.object({
        id: zod_1.z.string()
    }),
    async resolve({ ctx, input }) {
        return await ctx.prisma.user.findUnique({
            where: {
                id: input.id
            },
            include: {
                answers: true,
                comments: true,
                questions: true
            }
        });
    }
});
