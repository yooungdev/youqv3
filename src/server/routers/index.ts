import superjson from 'superjson'
//
import { createRouter } from "../createRouter";
// routers
import { questionRouter } from './question/question';
import { profileRouter } from './profile/profile';
import { questionRouterProtected } from './question/questionProtected';


export const appRouter = createRouter()
    .transformer(superjson)
    .merge('question.', questionRouter)
    .merge('question_protected.', questionRouterProtected)


    .merge('profile.', profileRouter)

export type AppRouter = typeof appRouter;