import { z } from "zod";
import { createRouter } from "../../createRouter";



export const profileRouter = createRouter()
    .mutation('getOne', {
        input: z.object({
            id: z.string()
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
            })
        }
    })