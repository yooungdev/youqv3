"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const router_1 = require("next/router");
// components
const QuestionQAComment_1 = __importDefault(require("./QuestionQAComment"));
// components/UI
const Avatar_1 = __importDefault(require("../UI/Avatar"));
const moment_1 = __importDefault(require("moment"));
const react_2 = require("next-auth/react");
const trpc_1 = require("utils/trpc");
const QuestionQ = ({ question }) => {
    var _a, _b, _c;
    const { data, status } = (0, react_2.useSession)();
    const router = (0, router_1.useRouter)();
    const createdAtQuestion = new Date(String(question === null || question === void 0 ? void 0 : question.createdAt));
    return (<div className="shadow-standart rounded-[10px] h-auto p-[20px] bg-white">
      <div className="flex items-center justify-between">
        <div className="flex">
          <Avatar_1.default onClick={() => router.push(`/profile/${question.authorId}`)} src={(_a = question === null || question === void 0 ? void 0 : question.author) === null || _a === void 0 ? void 0 : _a.image} height={35} width={35} isConfirmed={(_b = question === null || question === void 0 ? void 0 : question.author) === null || _b === void 0 ? void 0 : _b.isConfirmed} className="cursor-pointer rounded-full"/>
          <div className="ml-[10px] font-montserrat flex flex-col justify-center leading-[16px] text-[15px] sm:text-[16px]">
            <span className="text-[#232323] font-semibold">
              {(_c = question === null || question === void 0 ? void 0 : question.author) === null || _c === void 0 ? void 0 : _c.name}
            </span>
            <div className="flex">
              <span className="text-[#494949] font-medium">
                {(0, moment_1.default)(createdAtQuestion).fromNow()}
              </span>
            </div>
          </div>
        </div>
        <div className="text-[18px] font-bold font-nunito text-[#636777] p-[8px] flex items-center justify-center rounded-[8px] bg-[#ebebeb]">
          <span className="leading-none">{question === null || question === void 0 ? void 0 : question.rating}</span>
        </div>
      </div>
      <div className="pt-[13px] pr-[5px] pl-[5px] text-[16px] sm:text-[18px] font-sans font-medium">
        <p dangerouslySetInnerHTML={{ __html: question === null || question === void 0 ? void 0 : question.textHtml }}></p>
      </div>
      {(question === null || question === void 0 ? void 0 : question.comments) && (<QuestionQComments questionId={question === null || question === void 0 ? void 0 : question.id} initialComments={question === null || question === void 0 ? void 0 : question.comments}/>)}
      {status !== "authenticated" && (<div className="mt-[15px]">
          <p className="text-[#4971FF]  text-[16px] font-medium font-sans">
            <span onClick={() => router.push("/auth")} className="hover:underline font-[700] text-[17px] font-nunito cursor-pointer">
              Авторизуйтесь
            </span>{" "}
            - чтобы написать комментарий или дать ответ
          </p>
        </div>)}
    </div>);
};
const QuestionQComments = (0, react_1.memo)(({ initialComments, questionId }) => {
    const [comments, setComments] = (0, react_1.useState)(initialComments);
    const input = {
        questionId
    };
    trpc_1.trpc.useSubscription(["question.onCreateCommentQuestion", input], {
        onNext: (comment) => {
            setComments((comments) => {
                if (comments && comments.length > 0) {
                    return [...comments, comment];
                }
                return [comment];
            });
        },
    });
    if (comments.length > 0) {
        return (<div className={`flex flex-col mt-[15px] border-t-[1px] border-[hsl(0, 0%, 90%)]`}>
          {comments.map((comment) => (<QuestionQAComment_1.default key={comment === null || comment === void 0 ? void 0 : comment.id} comment={comment}/>))}
        </div>);
    }
});
exports.default = (0, react_1.memo)(QuestionQ);
