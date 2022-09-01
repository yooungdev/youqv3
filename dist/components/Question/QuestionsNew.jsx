"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
const react_1 = require("react");
//
const helping_1 = require("../../utils/helping");
const trpc_1 = require("../../utils/trpc");
const QuestionsNew = () => {
    var _a;
    const newQuestionsMutate = trpc_1.trpc.useMutation(['question.getAll']);
    (0, react_1.useEffect)(() => {
        try {
            newQuestionsMutate.mutate({
                limit: 4
            });
        }
        catch (error) {
        }
    }, []);
    return (<div className="flex flex-col">
            <span className="font-semibold font-montserrat text-[18px] text-[#232323]">
                Новые вопросы
            </span>
            <div className="pt-[30px]">
                {(_a = newQuestionsMutate === null || newQuestionsMutate === void 0 ? void 0 : newQuestionsMutate.data) === null || _a === void 0 ? void 0 : _a.map((newQuestion) => (<QuestionNew key={newQuestion.id} newQuestion={newQuestion}/>))}
            </div>
        </div>);
};
exports.default = QuestionsNew;
const QuestionNew = ({ newQuestion }) => {
    const router = (0, router_1.useRouter)();
    return (<div className="hover:shadow-standart flex flex-col text-center text-[rgb(9 21 38 / 85%)] text-[16px] font-medium rounded-[15px] py-[10px] px-[20px]">
            <div className="font-nunito">
                <span className="text-[17px] text-[#494949]">
                    {helping_1.itemsOptionsObject[newQuestion === null || newQuestion === void 0 ? void 0 : newQuestion.item]}
                </span>
                <span className="text-[#7f7f7f] ml-[15px] text-[17px]">
                    {helping_1.classesOptionsObject[newQuestion === null || newQuestion === void 0 ? void 0 : newQuestion.class]}
                </span>
            </div>
            <p onClick={() => router.push(`/question/${newQuestion.id}`)} style={{
            overflowWrap: 'anywhere',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
        }} className="hover:underline  font-nunito text-[17px] cursor-pointer font-semibold">
                {newQuestion === null || newQuestion === void 0 ? void 0 : newQuestion.text}
            </p>
            <span className="text-[#7f7f7f] font-nunito text-[17px]">
                createdat
            </span>
        </div>);
};
