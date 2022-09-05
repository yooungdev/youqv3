import { memo } from "react";
//
import { useRouter } from "next/router";
//
import moment from "moment";
// components/UI
import Avatar from "./UI/Avatar";
import Button from "./UI/Button";
// utils/helping
import { itemsOptionsObject } from "utils/helping";




type QuestionItemProps = {
  question?: any;
};

const QuestionItem = ({ question }: QuestionItemProps) => {
  const router = useRouter();

  const createdAtQuestionItem = new Date(String(question?.createdAt));

  return (
    <div className="w-full rounded-[10px] shadow-standart p-[20px] mt-[25px] first:mt-0 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar
            onClick={() => router.push(`/profile/${question?.authorId}`)}
            width={35}
            height={35}
            isConfirmed={question?.author?.isConfirmed}
            src={question?.author?.image}
            className="rounded-full cursor-pointer"
          />
          <div className="flex flex-col justify-center  text-[15px] sm:text-[16px] pl-[7px] font-montserrat">
            <span className="text-[#232323] leading-[16px] font-semibold">
              {itemsOptionsObject[question?.item]}
            </span>
            <div className="text-[#494949] leading-[16px] font-medium">
              <span>{moment(createdAtQuestionItem).fromNow()}</span>
            </div>
          </div>
        </div>
        {/* <div className="text-[18px] font-bold font-nunito text-[#636777] p-[8px] flex items-center justify-center rounded-[8px] bg-[#ebebeb]">
          <span className="leading-none">{question?.rating}</span>
        </div> */}
      </div>
      <div className="py-[13px]">
        <p
          onClick={() => router.push(`/question/${question?.id}`)}
          style={{
            overflowWrap: "anywhere",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            display: "-webkit-box",
            fontFamily: "sans-serif",
            fontWeight: 500,
            cursor: "pointer",
            // fontSize: 18
          }}
          className="text-[16px] sm:text-[18px] leading-[22px] hover:underline"
        >
          {question?.text}
        </p>
      </div>
      <div className="flex items-end justify-between">
        <div>
          {question?.answers?.length > 0 && (
            <span className="text-[16px] sm:text-[17px] font-nunito font-semibold">
              Ответов: {question?.answers?.length}
            </span>
          )}
        </div>
        <div>
          <Button
            onClick={() => router.push(`/question/${question?.id}`)}
            className="rounded-[10px] text-[#4971FF] border border-[#4971FF] bg-none outline-none cursor-pointer py-[3px] px-[6px] text-[16px] sm:py-[3px] sm:px-[10px] sm:text-[17px] font-nunito font-bold hover:text-white hover:bg-[#4971FF]"
          >
            Ответить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(QuestionItem);
