import { ReactNode, useEffect, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
//
import $api from "config";
// layouts
import PageContainer from "../layouts/PageContainer";
// components
import FilterByQuestions from "../components/FilterByQuestions";
import SearchByQuestions from "../components/SearchByQuestions";
import QuestionItem from "../components/QuestionItem";
// components/UI
import Button from "components/UI/Button";
// components/Skeletons
import QuetionItemSkeleton from "components/Skeletons/QuestionItemSkeleton";
// utils/gift
import loading from "../utils/gift/loading.gif";
// utils/svg
import Close from "../utils/svg/remove_xmark.svg";





const Home: NextPage = () => {
  const [questions, setQuestions] = useState<any>(undefined);
  const [questionsLoadingStatus, setQuestionLoadingStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  useEffect(() => {
    (async () => {
      try {
        setQuestionLoadingStatus("loading");
        const res = await $api.get(`question/getAll?limit=5`);

        if (res.status === 200) {
          setQuestionLoadingStatus("success");
          setQuestions(res.data);
        }
      } catch (error) {
        setQuestionLoadingStatus("error");
      }
    })();
  }, []);

  const router = useRouter();

  const [moreQuestions, setMoreQuestions] = useState<
    "loading" | "success" | "idle" | "error"
  >("idle");

  const getQuestions = async () => {
    setMoreQuestions('loading')
    try {
      const res = await $api.get(
        `question/getAll?limit=${questions.length + 5 ?? 5}`
      );
  
      if (res.status === 200) {
        setQuestions(res.data);
        setMoreQuestions('success')
      }
    } catch (error) {
      setMoreQuestions('error')
    }
  };

  return (
    <PageContainer>
      <div className="flex justify-between h-full">
        <div className="h-full w-[100%] pb-[60px] lg:w-[790px]">
          <SearchByQuestions />
          <div className="h-full max-w-[630px] mx-auto p-0 sm:pt-[50px]">
            {questionsLoadingStatus === "loading" && (
              <>
                <div className="hidden sm:flex flex-col">
                  <QuetionItemSkeleton />
                  <QuetionItemSkeleton />
                  <QuetionItemSkeleton />
                  <QuetionItemSkeleton />
                </div>
                <div className="flex sm:hidden h-full w-full items-center justify-center">
                  <Image
                    objectFit="contain"
                    height={150}
                    src={loading}
                    alt="loading"
                  />
                </div>
              </>
            )}
            {questionsLoadingStatus === "success" && (
              <>
                {questions?.map(
                  (question: any): ReactNode => (
                    <QuestionItem key={question.id} question={question} />
                  )
                )}
                <Button
                  disabled={moreQuestions === 'loading'}
                  onClick={getQuestions}
                  className="bg-white rounded-[10px] text-[17px] text-[#4971ff] font-nunito font-bold py-[7px] shadow-standart w-full mb-[80px] sm:mb-[15px] mt-[20px]"
                >
                  Загрузить еще
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="h-full w-[490px] hidden lg:block">
          <FilterByQuestions />
          <div className="mt-[20px] mx-auto max-w-[330px] relative">
            <Button
              onClick={() => sessionStorage.setItem("donate", "false")}
              className="absolute py-[2px] hover:bg-[rgba(255,255,255,0.4)] px-[4px] rounded-[5px] bg-[rgba(255,255,255,0.25)] right-[5px] top-[5px]"
            >
              <Close fill="white" width={10} />
            </Button>
            <Button
              onClick={() =>
                router.push(
                  "https://boosty.to/youq/single-payment/donation/216935"
                )
              }
              className="bg-[rgba(171,160,27,0.8491771708683473)] rounded-[10px] py-[7px] w-full text-white font-nunito font-bold text-[17px]"
            >
              Поддержать проект
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;
