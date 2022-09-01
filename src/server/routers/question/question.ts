import { createRouter } from "../../createRouter"
import { z } from "zod"
import * as trpc from '@trpc/server'
import { Events } from '../../../constants/events'


export const questionRouter = createRouter()
    .mutation('getAll', {
        input: z.object({
            limit: z.number()
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
            })
        }
    })
    .mutation('getOne', {
        input: z.object({
            id: z.number() || z.undefined()
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
            })
        }
    })
    .subscription('onCreateAnswer', {
        input: z.any(),
        async resolve({ ctx, input }) {
            return new trpc.Subscription((emit: any): any => {
                const onAnswer = (data: any) => {
                    if (input.questionId === data.questionId) {
                        emit.data(data)
                    }
                }

                ctx.ee.on(Events.CREATE_ANSWER, onAnswer)

                return () => {
                    ctx.ee.off(Events.CREATE_ANSWER, onAnswer)
                }
            })
        }
    })
    .subscription('onCreateCommentQuestion', {
        input: z.any(),
        async resolve({ ctx, input }) {
            return new trpc.Subscription((emit: any): any => {
                const onCommentQuestion = (data: any) => {
                    if (data.questionId === input.questionId) {
                        emit.data(data)
                    }
                }

                ctx.ee.on(Events.CREATE_COMMENT_QUESTION, onCommentQuestion)

                return () => {
                    ctx.ee.off(Events.CREATE_COMMENT_QUESTION, onCommentQuestion)
                }
            })
        }
    })
    .subscription('onCreateCommentAnswer', {
        input: z.object({
            answerId: z.number()
        }),
        async resolve({ ctx, input}) {
            return new trpc.Subscription((emit: any): any => {
                const onCommentAnswer = (data: any) => {
                    if (data.answerId === input.answerId) {
                        emit.data(data)
                    }
                }

                ctx.ee.on(Events.CREATE_COMMENT_ANSWER, onCommentAnswer)

                return () => {
                    ctx.ee.off(Events.CREATE_COMMENT_ANSWER, onCommentAnswer)
                }
            })
        }
    })
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
