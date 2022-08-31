import { memo, ReactNode, useState } from "react";
//
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useSession } from "next-auth/react";
import Image from "next/image";
//
import { trpc } from "utils/trpc";
// components
import MyEditor from "../MyEditor";
// components/UI
import Button from "../UI/Button";
// utils/svg
import Comment from "../../utils/svg/comment.svg";
import Answer from "../../utils/svg/answer.svg";
import RatingUp from "../../utils/svg/rating_up.svg";
import RatingDown from "../../utils/svg/rating_down.svg";
import Share from "../../utils/svg/share.svg";
// utils/gif
import LoadingSmall from "../../utils/gift/loading_small.gif";

type QuestionQToolbarProps = {
  questionId: number | undefined;
};

type Tab = {
  component: ReactNode;
  name: string;
};

const QuestionQToolbar = ({ questionId }: QuestionQToolbarProps) => {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);

  const [isHoverUp, setIsHoverUp] = useState(false);
  const [isHoverDown, setIsHoverDown] = useState(false);

  const onChangeActiveTab = (tab: Tab) => {
    setActiveTab((prev) => {
      if (prev && tab.name === prev.name) {
        return null;
      }
      return tab;
    });
  };

  return (
    <div className="shadow-standart font-nunito rounded-[10px] h-auto mt-[10px] flex flex-col py-[10px] px-[10px] bg-white">
      <div className="flex justify-between">
        <div className="flex">
          <button
            style={{
              background:
                activeTab?.name === "edit_answer" ? "#DEEBFF" : undefined,
            }}
            onClick={() =>
              onChangeActiveTab({
                name: "edit_answer",
                component: (
                  <EditAnswer
                    questionId={questionId}
                    setActiveTab={setActiveTab}
                  />
                ),
              })
            }
            className="hover:bg-[#DEEBFF] flex flex-col items-center justify-center text-[#4971FF] text-[15px] font-bold bg-none border-none outline-none cursor-pointer py-[5px] px-[10px] rounded-[10px]"
          >
            <Answer fill="#4971FF" width={20} height={20} />
            <span className="leading-[18px]">Ответить</span>
          </button>
          <button
            style={{
              background:
                activeTab?.name === "edit_comment" ? "#DEEBFF" : undefined,
            }}
            onClick={() =>
              onChangeActiveTab({
                name: "edit_comment",
                component: (
                  <EditComment
                    questionId={questionId}
                    setActiveTab={setActiveTab}
                  />
                ),
              })
            }
            className="hover:bg-[#DEEBFF] flex flex-col items-center justify-center text-[#4971FF] text-[15px] font-bold bg-none border-none outline-none cursor-pointer py-[5px] px-[10px] rounded-[10px]"
          >
            <Comment fill="#4971FF" width={20} height={20} />
            <span className="leading-[18px]">Уточнить</span>
          </button>
        </div>
        <div className="flex">
          <button
            onMouseEnter={() => setIsHoverUp(true)}
            onMouseLeave={() => setIsHoverUp(false)}
            className="hover:bg-[#DEEBFF] bg-none border-none outline-none cursor-pointer py-[5px] px-[10px] rounded-[10px]"
          >
            <RatingUp
              fill={isHoverUp ? "#4971FF" : "#86a8fc"}
              width={24}
              height={24}
            />
          </button>
          <button
            onMouseEnter={() => setIsHoverDown(true)}
            onMouseLeave={() => setIsHoverDown(false)}
            className="hover:bg-[#DEEBFF] bg-none border-none outline-none cursor-pointer py-[5px] px-[10px] rounded-[10px]"
          >
            <RatingDown
              fill={isHoverDown ? "#FD5F5F" : "#636466"}
              width={24}
              height={24}
            />
          </button>
          <button className="hover:bg-[#DEEBFF] ml-[20px] bg-none border-none outline-none cursor-pointer py-[5px] px-[10px] rounded-[10px]">
            <Share fill="#4971FF" width={22} height={22} />
          </button>
        </div>
      </div>
      {activeTab?.component}
    </div>
  );
};

type EditAnswerProps = {
  questionId: number | null | undefined;
  setActiveTab: any;
};

const EditAnswer = memo(({ questionId, setActiveTab }: EditAnswerProps) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const { mutateAsync: createAnswer } = trpc.useMutation([
    "question_protected.create_answer",
  ]);

  const onCreateAnswer = () => {
    try {
      const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
      const value = blocks
        .map((block) => (!block.text.trim() && "\n") || block.text)
        .join("\n");

      createAnswer({
        text: value,
        textHtml: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        questionId,
      });

      setActiveTab(null);
      setEditorState(EditorState.createEmpty());
    } catch (error) {}
  };

  return (
    <div>
      <MyEditor
        editorState={editorState}
        setEditorState={setEditorState}
        placeholder="Помни! Лучший ответ - тот, который написан понятно и грамотно."
      />
      <Button
        onClick={onCreateAnswer}
        className="py-[5px] px-[30px] rounded-[15px] font-nunito border-none outline-none bg-[#4971FF] text-white text-[18px] font-bold cursor-pointer hover:bg-[#2851E4]"
      >
        Ответить
      </Button>
    </div>
  );
});

type EditCommentProps = {
  questionId: number | null | undefined;
  setActiveTab: (arg: null) => void;
};

const EditComment = memo(({ questionId, setActiveTab }: EditCommentProps) => {
  const [comment, setComment] = useState("");

  const { data, status } = useSession();

  const questionCommentMutate = trpc.useMutation([
    "question_protected.create_comment_to_question",
  ]);

  const handleKeyDown = async (e: any) => {
    if (e.key === "Enter" && status === "authenticated") {
      try {
        await questionCommentMutate.mutateAsync({
          text: comment,
          questionId: questionId,
        });
        setComment("");
        setActiveTab(null);
      } catch (error) {}
    }
  };

  return (
    <div className="mt-[10px] relative">
      {questionCommentMutate?.status === "loading" && (
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
  );
});

export default QuestionQToolbar;
