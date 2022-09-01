import { createRouterProtected } from "../../createRouterProtected";
import { z } from "zod";

import { Events } from "../../../constants/events";

export const questionRouterProtected = createRouterProtected()
  .mutation('create_question', {
    input: z.object({
      text: z.string(),
      textHtml: z.string(),
      item: z.string(),
      class: z.string()
    }),
    async resolve({ ctx, input }: any) {
      const savedQuestion = await ctx.prisma.question.create({
        data: {
          text: input.text,
          textHtml: input.textHtml,
          item: input.item,
          class: input.class,
          author: { connect: { id: ctx?.session?.user?.id } }
        }
      })


      return savedQuestion
    }
  })
  .mutation("create_answer", {
    input: z.object({
      text: z.string(),
      textHtml: z.string(),
      questionId: z.number() || z.null() || z.undefined(),
    }),
    async resolve({ ctx, input }: any) {
      console.log(input);
      const answer = await ctx.prisma.answer.create({
        data: {
          text: input.text,
          textHtml: input.textHtml,
          question: { connect: { id: input.questionId } },
          author: { connect: { id: ctx?.session?.user?.id } },
        },
      });
      ctx.ee.emit(Events.CREATE_ANSWER, {
        ...answer,
        author: {
            ...ctx?.session?.user
        }
    });

      return {
        ...answer,
        author: {
            ...ctx?.session?.user
        }
      }
    },
  })
  .mutation("create_comment_to_question", {
    input: z.object({
      text: z.string(),
      questionId: z.number(),
    }),
    async resolve({ ctx, input }: any) {
      const commentQuestion = await ctx.prisma.comment.create({
        data: {
          text: input.text,
          question: { connect: { id: input.questionId } },
          author: { connect: { id: ctx?.session?.user?.id } },
        },
      });
      ctx.ee.emit(Events.CREATE_COMMENT_QUESTION, {
        ...commentQuestion,
        author: {
            ...ctx?.session?.user
        }
      });

      return {
        ...commentQuestion,
        author: {
            ...ctx?.session?.user
        }
      };
    },
  })
  .mutation("create_comment_to_answer", {
    input: z.object({
      text: z.string(),
      answerId: z.number(),
    }),
    async resolve({ ctx, input }: any) {
      const commentAnswer = await ctx.prisma.comment.create({
        data: {
          text: input.text,
          answer: { connect: { id: input.answerId } },
          author: { connect: { id: ctx?.session?.user?.id } },
        },
      });

      ctx.ee.emit(Events.CREATE_COMMENT_ANSWER, {
        ...commentAnswer,
        author: {
          ...ctx?.session?.user,
        },
      });

      return {
        ...commentAnswer,
        author: {
          ...ctx?.session?.user,
        },
      };
    },
  });
