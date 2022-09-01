"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
//
const draft_js_1 = require("draft-js");
const draftjs_to_html_1 = __importDefault(require("draftjs-to-html"));
const react_2 = require("next-auth/react");
const image_1 = __importDefault(require("next/image"));
//
const trpc_1 = require("utils/trpc");
// components
const MyEditor_1 = __importDefault(require("../MyEditor"));
// components/UI
const Button_1 = __importDefault(require("../UI/Button"));
// utils/svg
const comment_svg_1 = __importDefault(require("../../utils/svg/comment.svg"));
const answer_svg_1 = __importDefault(require("../../utils/svg/answer.svg"));
const rating_up_svg_1 = __importDefault(require("../../utils/svg/rating_up.svg"));
const rating_down_svg_1 = __importDefault(require("../../utils/svg/rating_down.svg"));
const share_svg_1 = __importDefault(require("../../utils/svg/share.svg"));
// utils/gif
const loading_small_gif_1 = __importDefault(require("../../utils/gift/loading_small.gif"));
const QuestionQToolbar = ({ questionId }) => {
    const [activeTab, setActiveTab] = (0, react_1.useState)(null);
    const [isHoverUp, setIsHoverUp] = (0, react_1.useState)(false);
    const [isHoverDown, setIsHoverDown] = (0, react_1.useState)(false);
    const onChangeActiveTab = (tab) => {
        setActiveTab((prev) => {
            if (prev && tab.name === prev.name) {
                return null;
            }
            return tab;
        });
    };
    return (<div className="shadow-standart font-nunito rounded-[10px] h-auto mt-[10px] flex flex-col py-[10px] px-[10px] bg-white">
      <div className="flex justify-between">
        <div className="flex">
          <button style={{
            background: (activeTab === null || activeTab === void 0 ? void 0 : activeTab.name) === "edit_answer" ? "#DEEBFF" : undefined,
        }} onClick={() => onChangeActiveTab({
            name: "edit_answer",
            component: (<EditAnswer questionId={questionId} setActiveTab={setActiveTab}/>),
        })} className="hover:bg-[#DEEBFF] flex flex-col items-center justify-center text-[#4971FF] text-[15px] font-bold bg-none border-none outline-none cursor-pointer py-[5px] px-[10px] rounded-[10px]">
            <answer_svg_1.default fill="#4971FF" width={20} height={20}/>
            <span className="leading-[18px]">Ответить</span>
          </button>
          <button style={{
            background: (activeTab === null || activeTab === void 0 ? void 0 : activeTab.name) === "edit_comment" ? "#DEEBFF" : undefined,
        }} onClick={() => onChangeActiveTab({
            name: "edit_comment",
            component: (<EditComment questionId={questionId} setActiveTab={setActiveTab}/>),
        })} className="hover:bg-[#DEEBFF] flex flex-col items-center justify-center text-[#4971FF] text-[15px] font-bold bg-none border-none outline-none cursor-pointer py-[5px] px-[10px] rounded-[10px]">
            <comment_svg_1.default fill="#4971FF" width={20} height={20}/>
            <span className="leading-[18px]">Уточнить</span>
          </button>
        </div>
        <div className="flex">
          <button onMouseEnter={() => setIsHoverUp(true)} onMouseLeave={() => setIsHoverUp(false)} className="hover:bg-[#DEEBFF] bg-none border-none outline-none cursor-pointer py-[5px] px-[10px] rounded-[10px]">
            <rating_up_svg_1.default fill={isHoverUp ? "#4971FF" : "#86a8fc"} width={24} height={24}/>
          </button>
          <button onMouseEnter={() => setIsHoverDown(true)} onMouseLeave={() => setIsHoverDown(false)} className="hover:bg-[#DEEBFF] bg-none border-none outline-none cursor-pointer py-[5px] px-[10px] rounded-[10px]">
            <rating_down_svg_1.default fill={isHoverDown ? "#FD5F5F" : "#636466"} width={24} height={24}/>
          </button>
          <button className="hover:bg-[#DEEBFF] ml-[20px] bg-none border-none outline-none cursor-pointer py-[5px] px-[10px] rounded-[10px]">
            <share_svg_1.default fill="#4971FF" width={22} height={22}/>
          </button>
        </div>
      </div>
      {activeTab === null || activeTab === void 0 ? void 0 : activeTab.component}
    </div>);
};
const EditAnswer = (0, react_1.memo)(({ questionId, setActiveTab }) => {
    const [editorState, setEditorState] = (0, react_1.useState)(() => draft_js_1.EditorState.createEmpty());
    const { mutateAsync: createAnswer } = trpc_1.trpc.useMutation([
        "question_protected.create_answer",
    ]);
    const onCreateAnswer = () => {
        try {
            const blocks = (0, draft_js_1.convertToRaw)(editorState.getCurrentContent()).blocks;
            const value = blocks
                .map((block) => (!block.text.trim() && "\n") || block.text)
                .join("\n");
            createAnswer({
                text: value,
                textHtml: (0, draftjs_to_html_1.default)((0, draft_js_1.convertToRaw)(editorState.getCurrentContent())),
                questionId,
            });
            setActiveTab(null);
            setEditorState(draft_js_1.EditorState.createEmpty());
        }
        catch (error) { }
    };
    return (<div>
      <MyEditor_1.default editorState={editorState} setEditorState={setEditorState} placeholder="Помни! Лучший ответ - тот, который написан понятно и грамотно."/>
      <Button_1.default onClick={onCreateAnswer} className="py-[5px] px-[30px] rounded-[15px] font-nunito border-none outline-none bg-[#4971FF] text-white text-[18px] font-bold cursor-pointer hover:bg-[#2851E4]">
        Ответить
      </Button_1.default>
    </div>);
});
const EditComment = (0, react_1.memo)(({ questionId, setActiveTab }) => {
    const [comment, setComment] = (0, react_1.useState)("");
    const { data, status } = (0, react_2.useSession)();
    const questionCommentMutate = trpc_1.trpc.useMutation([
        "question_protected.create_comment_to_question",
    ]);
    const handleKeyDown = async (e) => {
        if (e.key === "Enter" && status === "authenticated") {
            try {
                await questionCommentMutate.mutateAsync({
                    text: comment,
                    questionId: questionId,
                });
                setComment("");
                setActiveTab(null);
            }
            catch (error) { }
        }
    };
    return (<div className="mt-[10px] relative">
      {(questionCommentMutate === null || questionCommentMutate === void 0 ? void 0 : questionCommentMutate.status) === "loading" && (<div className="absolute right-[10px] bottom-[-10px]">
          <image_1.default src={loading_small_gif_1.default} alt="loading" objectFit="contain" height={40} width={40}/>
        </div>)}
      <input value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={handleKeyDown} placeholder="Уточните вопрос" className="w-full rounded-[20px] py-[3px] px-[13px] outline-none text-[16px] border-[1px] border-[hsl(0, 0%, 90%)]" type="text"/>
    </div>);
});
exports.default = QuestionQToolbar;
