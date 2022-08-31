import { ReactNode, useEffect } from "react";
import type { NextPage } from "next";
// layouts
import PageContainer from "../layouts/PageContainer";
// components 
import FilterByQuestions from "../components/FilterByQuestions";
import SearchByQuestions from "../components/SearchByQuestions";
import QuestionItem from "../components/QuestionItem";
//
import { trpc } from "../utils/trpc";
// type TechnologyCardProps = {
//   name: string;
//   description: string;
//   documentation: string;
// };

const Home: NextPage = () => {
  
  const questionsMutate = trpc.useMutation(['question.getAll'])


  useEffect(() => {
    try {
      questionsMutate.mutate({
        limit: 10
      })
    } catch (error) {
      
    }
  }, [])



  return (
    <PageContainer>
      <div className="flex justify-between h-full">
        <div className="h-full w-[100%] lg:w-[790px]">
          <SearchByQuestions />
          <div className="h-full max-w-[630px] mx-auto p-0 sm:pt-[50px]">
            {questionsMutate?.status === 'success' && 
              questionsMutate?.data?.map((question: any): ReactNode => (
                <QuestionItem 
                  key={question.id} 
                  question={question} 
                />
              ))
            }
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
