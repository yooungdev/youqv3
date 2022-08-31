import { ReactNode, useEffect, useState, memo } from "react";
import type { NextPage } from "next";
//
import { useRouter } from "next/router";
//
import { useSession } from "next-auth/react";
import Image from "next/image";
// components
import QuestionQ from "../../components/Question/QuestionQ";
import QuestionA from "../../components/Question/QuestionA";
import QuestionsNew from "../../components/Question/QuestionsNew";
import QuestionQToolbar from "../../components/Question/QuestionQToolbar";
// layouts
import PageContainer from "../../layouts/PageContainer";
// utils
import { trpc } from "../../utils/trpc";
// utils/gift
import Loading from '../../utils/gift/loading.gif'





const Question: NextPage = () => {
  const router = useRouter();

  const { data, status } = useSession();

  const id: number | null | undefined = Number(router?.query?.id);
  const input = {
    id: id,
  };

  const questionMutate: any = trpc.useMutation(["question.getOne"]);

  useEffect(() => {
    if (id) {
      try {
        questionMutate.mutate(input);
      } catch (error) {}
    }
  }, [id]);

  console.log(questionMutate);

  return (
    <PageContainer>
      <div className="flex justify-between h-full">
        <div className={`h-full w-[100%] lg:w-[${questionMutate?.status === 'loading' ? 'w-full' : '790px'}]`}>
          {questionMutate?.status === 'loading' && (
            <div className="flex items-center justify-center w-full h-full">
              <Image src={Loading} objectFit="contain" alt="loading" height={150} />
            </div>
          )}
          {questionMutate &&
            questionMutate?.data &&
            questionMutate?.status === "success" && (
              <div className="max-w-[630px] mx-auto">
                <QuestionQ question={questionMutate?.data} />
                {status === "authenticated" && (
                  <QuestionQToolbar questionId={questionMutate?.data?.id} />
                )}
                {questionMutate?.status === "success" &&
                  questionMutate?.data?.answers?.length > 0 && (
                    <div className="mt-[30px]">
                      <span className="text-[19px] sm:text-[21px] text-[#494949] font-semibold font-nunito">
                        Ответ или решение:{" "}
                        {questionMutate?.data?.answers?.length}
                      </span>
                    </div>
                  )}
                {questionMutate?.status === "success" && (
                  <QuestionAnwers
                    questionId={id}
                    initialAnswers={questionMutate?.data?.answers}
                  />
                )}
              </div>
            )}
        </div>
        {questionMutate?.status === "success" && (
          <div className="h-full w-[490px] hidden lg:block">
            <div className="max-w-[330px] mx-auto">
              <QuestionsNew />
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

type QuestionAnwersProps = {
  initialAnswers: any;
  questionId: number | null | undefined;
};

const QuestionAnwers = memo(
  ({ initialAnswers, questionId }: QuestionAnwersProps) => {
    const [answers, setAnswers] = useState(initialAnswers ?? []);

    trpc.useSubscription(
      ["question.onCreateAnswer", { questionId: questionId }],
      {
        onNext: (answer) => {
          setAnswers((answers: any): any => {
            if (answers && answers.length > 0) {
              return [answer, ...answers];
            }
            return [answer];
          });
        },
      }
    );

    return (
      <div className="w-full flex flex-col pt-[30px]">
        {answers?.map(
          (answer: any): ReactNode => (
            <QuestionA answer={answer} key={answer.id} />
          )
        )}
      </div>
    );
  }
);

export default Question;
