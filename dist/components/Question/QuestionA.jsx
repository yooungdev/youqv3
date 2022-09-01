"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const router_1 = require("next/router");
const react_2 = require("next-auth/react");
//
const trpc_1 = require("../../utils/trpc");
// components
const QuestionQAComment_1 = __importDefault(require("./QuestionQAComment"));
const QuestionRating_1 = __importDefault(require("./QuestionRating"));
// components/UI
const Avatar_1 = __importDefault(require("../UI/Avatar"));
// utils/svg
const share_svg_1 = __importDefault(require("../../utils/svg/share.svg"));
// utils/gif
const loading_small_gif_1 = __importDefault(require("../../utils/gift/loading_small.gif"));
const image_1 = __importDefault(require("next/image"));
const moment_1 = __importDefault(require("moment"));
const QuestionA = ({ answer }) => {
    var _a, _b, _c;
    const { status } = (0, react_2.useSession)();
    const router = (0, router_1.useRouter)();
    const createdAtAnswer = new Date(String(answer === null || answer === void 0 ? void 0 : answer.createdAt));
    return (<div className="shadow-standart first:mt-0 mt-[80px] rounded-[10px] w-full h-auto p-[20px] bg-white">
      <div className="flex item-center justify-between">
        <div className="flex">
          <Avatar_1.default onClick={() => router.push(`/profile/${answer === null || answer === void 0 ? void 0 : answer.authorId}`)} width={35} height={35} src={(_a = answer === null || answer === void 0 ? void 0 : answer.author) === null || _a === void 0 ? void 0 : _a.image} isConfirmed={(_b = answer === null || answer === void 0 ? void 0 : answer.author) === null || _b === void 0 ? void 0 : _b.isConfirmed} className="cursor-pointer rounded-full"/>
          <div className="flex font-montserrat flex-col ml-[10px] justify-center leading-[16px] text-[15px] sm:text-[16px]">
            <span className="text-[#232323] font-semibold">
              {(_c = answer === null || answer === void 0 ? void 0 : answer.author) === null || _c === void 0 ? void 0 : _c.name}
            </span>
            <div className="flex">
              <span className="text-[#494949] font-medium">
                {(0, moment_1.default)(createdAtAnswer).fromNow()}
              </span>
            </div>
          </div>
        </div>
        <div className="text-[18px] font-bold font-nunito text-[#636777] p-[8px] flex items-center justify-center rounded-[8px] bg-[#ebebeb]">
          <span className="leading-none">{answer === null || answer === void 0 ? void 0 : answer.rating}</span>
        </div>
      </div>
      <div className="pt-[13px] pr-[5px] pl-[5px] text-[16px] sm:text-[18px] font-sans font-medium">
        <p dangerouslySetInnerHTML={{ __html: answer === null || answer === void 0 ? void 0 : answer.textHtml }}></p>
      </div>
      <div className="flex items-end justify-between">
        {status === "authenticated" ? <QuestionRating_1.default /> : <div></div>}
        <button className="hover:bg-[#DEEBFF] bg-none border-none outline-none cursor-pointer py-[5px] px-[10px] rounded-[10px]">
          <share_svg_1.default fill="#4971FF" width={20} height={20}/>
        </button>
      </div>

      {answer && (<QuestionAComments answerId={answer === null || answer === void 0 ? void 0 : answer.id} initialComments={answer === null || answer === void 0 ? void 0 : answer.comments}/>)}
    </div>);
};
const QuestionAComments = (0, react_1.memo)(({ initialComments, answerId }) => {
    var _a;
    const [comments, setComments] = (0, react_1.useState)(initialComments !== null && initialComments !== void 0 ? initialComments : []);
    const [comment, setComment] = (0, react_1.useState)("");
    const { data, status } = (0, react_2.useSession)();
    const router = (0, router_1.useRouter)();
    const input = {
        answerId
    };
    trpc_1.trpc.useSubscription(["question.onCreateCommentAnswer", input], {
        onNext: (comment) => {
            setComments((comments) => {
                if (comment && comments.length > 0) {
                    return [...comments, comment];
                }
                return [comment];
            });
        },
    });
    const answerMutate = trpc_1.trpc.useMutation([
        "question_protected.create_comment_to_answer",
    ]);
    const handleKeyDown = async (e) => {
        if (e.key === "Enter" && status === "authenticated") {
            try {
                await answerMutate.mutateAsync({
                    text: comment,
                    answerId: answerId
                });
                setComment("");
            }
            catch (error) { }
        }
    };
    return (<div className="flex flex-col mt-[15px] border-t-[1px] border-[hsl(0, 0%, 90%)]">
        {comments === null || comments === void 0 ? void 0 : comments.map((comment) => (<QuestionQAComment_1.default key={comment.id} comment={comment}/>))}
        {status === "authenticated" ? (<div className="flex w-full justify-between mt-[15px] items-center">
            <Avatar_1.default src={(_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.image} width={30} height={30} className="rounded-full mr-[15px]"/>
            <div className="w-[93%] relative">
              {answerMutate.status === "loading" && (<div className="absolute right-[10px] bottom-[-10px]">
                  <image_1.default src={loading_small_gif_1.default} alt="loading" objectFit="contain" height={40} width={40}/>
                </div>)}
              <input value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={handleKeyDown} placeholder="Уточните вопрос" className="w-full rounded-[20px] py-[3px] px-[13px] outline-none text-[16px] border-[1px] border-[hsl(0, 0%, 90%)]" type="text"/>
            </div>
          </div>) : (<div className="mt-[15px]">
            <p className="text-[#4971FF]  text-[16px] font-medium font-sans">
              <span onClick={() => router.push('/auth')} className="hover:underline font-[700] text-[17px] font-nunito cursor-pointer">
                Авторизуйтесь
              </span>{" "}
              - чтобы написать комментарий
            </p>
          </div>)}
      </div>);
});
exports.default = (0, react_1.memo)(QuestionA);
