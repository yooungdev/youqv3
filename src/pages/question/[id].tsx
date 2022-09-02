import { ReactNode, useEffect, useState, memo } from "react";
import type { NextPage } from "next";
//
import { useRouter } from "next/router";
//
import Image from "next/image";
// components
import QuestionQ from "../../components/Question/QuestionQ";
import QuestionA from "../../components/Question/QuestionA";
import QuestionsNew from "../../components/Question/QuestionsNew";
import QuestionQToolbar from "../../components/Question/QuestionQToolbar";
// layouts
import PageContainer from "../../layouts/PageContainer";
// utils/gift
import Loading from "../../utils/gift/loading.gif";
import axios from "axios";

const Question: NextPage = () => {
  const [question, setQuestion] = useState<any>(undefined);
  const [questionLoadingStatus, setQuestionLoadingStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (router?.query?.id) {
        try {
          setQuestionLoadingStatus("loading");
          const res = await axios.get(
            `http://localhost:3333/question/getOne/${router.query.id}`
          );

          if (res.status === 200) {
            setQuestionLoadingStatus("success");
            setQuestion(res.data);
          }
        } catch (error) {
          setQuestionLoadingStatus("error");
        }
      }
    })();
  }, [router.query.id]);

  return (
    <PageContainer title={question?.text ?? undefined}>
      <div className="flex justify-between h-full">
        <div className={`h-full w-[100%] lg:w-[790px]`}>
          {/* {questionMutate?.status === 'loading' && (
            <div className="flex items-center justify-center w-full h-full">
              <Image src={Loading} objectFit="contain" alt="loading" height={150} />
            </div>
          )} */}
          {questionLoadingStatus === "success" && (
            <div className="max-w-[630px] mx-auto">
              <QuestionQ question={question} />
              {/* {status === "authenticated" && (
                  <QuestionQToolbar questionId={questionMutate?.data?.id} />
                )} */}
              {question?.answers?.length > 0 && (
                <div className="mt-[30px]">
                  <span className="text-[19px] sm:text-[21px] text-[#494949] font-semibold font-nunito">
                    Ответ или решение: {question?.answers?.length}
                  </span>
                </div>
              )}
              {/* {questionMutate?.status === "success" && ( */}
              <QuestionAnwers
                questionId={question?.id}
                initialAnswers={question?.answers}
              />
              {/* )} */}
            </div>
          )}
        </div>
        {question && (
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
