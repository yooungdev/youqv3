"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
//
const router_1 = require("next/router");
//
const react_2 = require("next-auth/react");
const image_1 = __importDefault(require("next/image"));
// components
const QuestionQ_1 = __importDefault(require("../../components/Question/QuestionQ"));
const QuestionA_1 = __importDefault(require("../../components/Question/QuestionA"));
const QuestionsNew_1 = __importDefault(require("../../components/Question/QuestionsNew"));
const QuestionQToolbar_1 = __importDefault(require("../../components/Question/QuestionQToolbar"));
// layouts
const PageContainer_1 = __importDefault(require("../../layouts/PageContainer"));
// utils
const trpc_1 = require("../../utils/trpc");
// utils/gift
const loading_gif_1 = __importDefault(require("../../utils/gift/loading.gif"));
const Question = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const router = (0, router_1.useRouter)();
    const { data, status } = (0, react_2.useSession)();
    const id = Number((_a = router === null || router === void 0 ? void 0 : router.query) === null || _a === void 0 ? void 0 : _a.id);
    const input = {
        id: id,
    };
    const questionMutate = trpc_1.trpc.useMutation(["question.getOne"]);
    (0, react_1.useEffect)(() => {
        if (id) {
            try {
                questionMutate.mutate(input);
            }
            catch (error) { }
        }
    }, [id]);
    return (<PageContainer_1.default title={(_c = (_b = questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.data) === null || _b === void 0 ? void 0 : _b.text) !== null && _c !== void 0 ? _c : undefined}>
      <div className="flex justify-between h-full">
        <div className={`h-full w-[100%] lg:w-[${(questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.status) === 'loading' ? 'w-full' : '790px'}]`}>
          {(questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.status) === 'loading' && (<div className="flex items-center justify-center w-full h-full">
              <image_1.default src={loading_gif_1.default} objectFit="contain" alt="loading" height={150}/>
            </div>)}
          {questionMutate &&
            (questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.data) &&
            (questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.status) === "success" && (<div className="max-w-[630px] mx-auto">
                <QuestionQ_1.default question={questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.data}/>
                {status === "authenticated" && (<QuestionQToolbar_1.default questionId={(_d = questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.data) === null || _d === void 0 ? void 0 : _d.id}/>)}
                {(questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.status) === "success" &&
                ((_f = (_e = questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.data) === null || _e === void 0 ? void 0 : _e.answers) === null || _f === void 0 ? void 0 : _f.length) > 0 && (<div className="mt-[30px]">
                      <span className="text-[19px] sm:text-[21px] text-[#494949] font-semibold font-nunito">
                        Ответ или решение:{" "}
                        {(_h = (_g = questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.data) === null || _g === void 0 ? void 0 : _g.answers) === null || _h === void 0 ? void 0 : _h.length}
                      </span>
                    </div>)}
                {(questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.status) === "success" && (<QuestionAnwers questionId={id} initialAnswers={(_j = questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.data) === null || _j === void 0 ? void 0 : _j.answers}/>)}
              </div>)}
        </div>
        {(questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.status) === "success" && (<div className="h-full w-[490px] hidden lg:block">
            <div className="max-w-[330px] mx-auto">
              <QuestionsNew_1.default />
            </div>
          </div>)}
      </div>
    </PageContainer_1.default>);
};
const QuestionAnwers = (0, react_1.memo)(({ initialAnswers, questionId }) => {
    const [answers, setAnswers] = (0, react_1.useState)(initialAnswers !== null && initialAnswers !== void 0 ? initialAnswers : []);
    const input = {
        questionId
    };
    trpc_1.trpc.useSubscription(["question.onCreateAnswer", input], {
        onNext: (answer) => {
            setAnswers((answers) => {
                if (answers && answers.length > 0) {
                    return [answer, ...answers];
                }
                return [answer];
            });
        },
    });
    return (<div className="w-full flex flex-col pt-[30px]">
        {answers === null || answers === void 0 ? void 0 : answers.map((answer) => (<QuestionA_1.default answer={answer} key={answer.id}/>))}
      </div>);
});
exports.default = Question;
