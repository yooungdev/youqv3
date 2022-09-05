import { memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
// components
import QuestionQAComment from "./QuestionQAComment";
import QuestionRating from "./QuestionRating";
// components/UI
import Avatar from "../UI/Avatar";
// utils/svg
import Share from "../../utils/svg/share.svg";
// utils/gif
import LoadingSmall from "../../utils/gift/loading_small.gif";
import Image from "next/image";
import moment from "moment";
import socket from "socket";
import { useTypedSelector } from "hooks/useTypedSelector";

type QuestionAProps = {
  answer: any;
};

const QuestionA = ({ answer }: QuestionAProps) => {
  const router = useRouter();

  const createdAtAnswer = new Date(String(answer?.createdAt));

  return (
    <div className="shadow-standart first:mt-0 mt-[80px] rounded-[10px] w-full h-auto p-[20px] bg-white">
      <div className="flex item-center justify-between">
        <div className="flex">
          <Avatar
            onClick={() => router.push(`/profile/${answer?.authorId}`)}
            width={35}
            height={35}
            src={answer?.author?.image}
            isConfirmed={answer?.author?.isConfirmed}
            className="cursor-pointer rounded-full"
          />
          <div className="flex font-montserrat flex-col ml-[10px] justify-center leading-[16px] text-[15px] sm:text-[16px]">
            <span className="text-[#232323] font-semibold">
              {answer?.author?.name}
            </span>
            <div className="flex">
              <span className="text-[#494949] font-medium">
                {moment(createdAtAnswer).fromNow()}
              </span>
            </div>
          </div>
        </div>
        {/* <div className="text-[18px] font-bold font-nunito text-[#636777] p-[8px] flex items-center justify-center rounded-[8px] bg-[#ebebeb]">
          <span className="leading-none">{answer?.rating}</span>
        </div> */}
      </div>
      <div className="pt-[13px] pr-[5px] pl-[5px] text-[16px] sm:text-[18px] font-sans font-medium">
        <p dangerouslySetInnerHTML={{ __html: answer?.textHtml }}></p>
      </div>
      <div className="flex items-end justify-between">
        {/* {status === "authenticated" ? <QuestionRating /> : <div></div>} */}
        {/* <button className="hover:bg-[#DEEBFF] bg-none border-none outline-none cursor-pointer py-[5px] px-[10px] rounded-[10px]">
          <Share fill="#4971FF" width={20} height={20} />
        </button> */}
      </div>

      {answer && (
        <QuestionAComments
          answerId={answer?.id}
          initialComments={answer?.comments}
        />
      )}
    </div>
  );
};

type QuestionACommentsProps = {
  initialComments: any;
  answerId: any;
};

const QuestionAComments = memo(
  ({ initialComments, answerId }: QuestionACommentsProps) => {
    const [comments, setComments] = useState(initialComments ?? []);
    const [comment, setComment] = useState("");

    const [loadingComment, setLoadingComment] = useState<
      "idle" | "loading" | "error" | "success"
    >("idle");

    const { user, status } = useTypedSelector((state) => state.user);

    const router = useRouter();

    useEffect(() => {
      const listener = (answerComment: any) => {
        setComments((prev: any): any => {
          if (prev.length > 0) {
            return [...prev, answerComment];
          }

          return [answerComment];
        });
      };

      socket.on("createAnswerCommentClient", listener);

      return () => socket.off("createAnswerCommentClient", listener);
    }, []);


    const handleKeyDown = async (e: any) => {
      if (e.key === "Enter") {
        setLoadingComment("loading");
        try {
          setTimeout(() => {
            socket.emit("createAnswerCommentServer", {
              text: comment,
              answerId,
              authorId: user.id,
            });

            setLoadingComment("success");
            setComment("");
          }, 500);
        } catch (error) {
          setLoadingComment("error");
        }
      }
    };

    return (
      <div className="flex flex-col mt-[15px] border-t-[1px] border-[hsl(0, 0%, 90%)]">
        {comments?.map((comment: any) => (
          <QuestionQAComment key={comment.id} comment={comment} />
        ))}
        {status === "authorized" ? (
          <div className="flex w-full justify-between mt-[15px] items-center">
            <Avatar
              src={undefined}
              width={30}
              height={30}
              className="rounded-full mr-[15px]"
            />
            <div className="w-[93%] relative">
              {loadingComment === "loading" && (
                <div className="absolute right-[10px] bottom-[-10px]">
                  <Image
                    src={LoadingSmall}
                    alt="loading"
                    objectFit="contain"
                    height={40}
                    width={40}
                  />
                </div>
              )}
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Уточните вопрос"
                className="w-full rounded-[20px] py-[3px] px-[13px] outline-none text-[16px] border-[1px] border-[hsl(0, 0%, 90%)]"
                type="text"
              />
            </div>
          </div>
        ) : (
          <div className="mt-[15px]">
            <p className="text-[#4971FF]  text-[16px] font-medium font-sans">
              <span
                onClick={() => router.push("/auth")}
                className="hover:underline font-[700] text-[17px] font-nunito cursor-pointer"
              >
                Авторизуйтесь
              </span>{" "}
              - чтобы написать комментарий
            </p>
          </div>
        )}
      </div>
    );
  }
);

export default memo(QuestionA);
