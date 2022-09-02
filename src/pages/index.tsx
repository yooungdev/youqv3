import { ReactNode, useEffect, useState } from "react";
import type { NextPage } from "next";
// layouts
import PageContainer from "../layouts/PageContainer";
// components
import FilterByQuestions from "../components/FilterByQuestions";
import SearchByQuestions from "../components/SearchByQuestions";
import QuestionItem from "../components/QuestionItem";
import axios from "axios";

const Home: NextPage = () => {
  const [questions, setQuestions] = useState<any>(undefined);
  const [questionsLoadingStatus, setQuestionLoadingStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  useEffect(() => {
    (async () => {
      try {
        setQuestionLoadingStatus('loading')
        const res = await axios.get(
          "http://localhost:3333/question/getAll?limit=5"
        );

        if (res.status === 200) {
          setQuestionLoadingStatus('success')
          setQuestions(res.data)
        }
      } catch (error) {
        setQuestionLoadingStatus('error')
      }
    })();

  }, []);

  return (
    <PageContainer>
      <div className="flex justify-between h-full">
        <div className="h-full w-[100%] lg:w-[790px]">
          <SearchByQuestions />
          <div className="h-full max-w-[630px] mx-auto p-0 sm:pt-[50px]">
            {/* {questionsIsLoading && */}
            {questions?.map(
              (question: any): ReactNode => (
                <QuestionItem key={question.id} question={question} />
              )
            )}
            {/* )} */}
          </div>
        </div>
        <div className="h-full w-[490px] hidden lg:block">
          <FilterByQuestions />
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;
