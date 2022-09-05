import { memo, useEffect, useState } from "react";
//
import { useRouter } from "next/router";
//
import moment from "moment";
// components
import QuestionQAComment from "./QuestionQAComment";
// components/UI
import Avatar from "../UI/Avatar";
import socket from "socket";
import { useTypedSelector } from "hooks/useTypedSelector";



type QuestionQProps = {
  question: any;
};

const QuestionQ = ({ question }: QuestionQProps) => {

  const router = useRouter();

  const createdAtQuestion = new Date(String(question?.createdAt));

  const { user, status } = useTypedSelector(state => state.user)

  return (
    <div className="shadow-standart rounded-[10px] h-auto p-[20px] bg-white">
      <div className="flex items-center justify-between">
        <div className="flex">
          <Avatar
            onClick={() => router.push(`/profile/${question.authorId}`)}
            src={question?.author?.image}
            height={35}
            width={35}
            isConfirmed={question?.author?.isConfirmed}
            className="cursor-pointer rounded-full"
          />
          <div className="ml-[10px] font-montserrat flex flex-col justify-center leading-[16px] text-[15px] sm:text-[16px]">
            <span className="text-[#232323] font-semibold">
              {question?.author?.name}
            </span>
            <div className="flex">
              <span className="text-[#494949] font-medium">
                {moment(createdAtQuestion).fromNow()}
              </span>
            </div>
          </div>
        </div>
        {/* <div className="text-[18px] font-bold font-nunito text-[#636777] p-[8px] flex items-center justify-center rounded-[8px] bg-[#ebebeb]">
          <span className="leading-none">{question?.rating}</span>
        </div> */}
      </div>
      <div className="pt-[13px] pr-[5px] pl-[5px] text-[16px] sm:text-[18px] font-sans font-medium">
        <p dangerouslySetInnerHTML={{ __html: question?.textHtml }}></p>
      </div>
      {question?.comments && (
        <QuestionQComments
          questionId={question?.id}
          initialComments={question?.comments}
        />
      )}
      {status !== "authorized" && (
        <div className="mt-[15px]">
          <p className="text-[#4971FF]  text-[16px] font-medium font-sans">
            <span
              onClick={() => router.push("/auth")}
              className="hover:underline font-[700] text-[17px] font-nunito cursor-pointer"
            >
              Авторизуйтесь
            </span>{" "}
            - чтобы написать комментарий или дать ответ
          </p>
        </div>
      )}
    </div>
  );
};

type QuestionQCommentsProps = {
  initialComments: any;
  questionId: any;
};

const QuestionQComments = memo(
  ({ initialComments, questionId }: QuestionQCommentsProps): any => {
    const [comments, setComments] = useState<any>(initialComments ?? []);


    useEffect(() => {
      const listener = (questionComment: any) => {
        setComments((prev: any): any => {
          if (prev.length > 0) {
            return [...prev, questionComment]
          }
  
          return [questionComment]
        })
      }

      socket.on('createQuestionCommentClient', listener)
  

      return () => socket.off('createQuestionCommentClient', listener)
    }, [])
    

    if (comments.length > 0) {
      return (
        <div
          className={`flex flex-col mt-[15px] border-t-[1px] border-[hsl(0, 0%, 90%)]`}
        >
          {comments.map((comment: any) => (
            <QuestionQAComment key={comment?.id} comment={comment} />
          ))}
        </div>
      );
    }
  }
);

export default memo(QuestionQ);
