import * as trpc from '@trpc/server'
import { createRouter } from './createRouter'



export const createRouterProtected = () => {
    return createRouter().middleware(({ ctx, next }) => {
        if (!ctx.session || !ctx.session.user) {
            throw new trpc.TRPCError({ code: 'UNAUTHORIZED' })
        }

        return next({
            ctx: {
                ...ctx,
                session: { ...ctx.session, user: ctx.session.user }
            }
        })
    }) 
}