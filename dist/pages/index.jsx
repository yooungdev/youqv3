"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
// layouts
const PageContainer_1 = __importDefault(require("../layouts/PageContainer"));
// components 
const FilterByQuestions_1 = __importDefault(require("../components/FilterByQuestions"));
const SearchByQuestions_1 = __importDefault(require("../components/SearchByQuestions"));
const QuestionItem_1 = __importDefault(require("../components/QuestionItem"));
//
const trpc_1 = require("../utils/trpc");
// type TechnologyCardProps = {
//   name: string;
//   description: string;
//   documentation: string;
// };
const Home = () => {
    var _a;
    const questionsMutate = trpc_1.trpc.useMutation(['question.getAll']);
    (0, react_1.useEffect)(() => {
        try {
            questionsMutate.mutate({
                limit: 10
            });
        }
        catch (error) {
        }
    }, []);
    return (<PageContainer_1.default>
      <div className="flex justify-between h-full">
        <div className="h-full w-[100%] lg:w-[790px]">
          <SearchByQuestions_1.default />
          <div className="h-full max-w-[630px] mx-auto p-0 sm:pt-[50px]">
            {(questionsMutate === null || questionsMutate === void 0 ? void 0 : questionsMutate.status) === 'success' &&
            ((_a = questionsMutate === null || questionsMutate === void 0 ? void 0 : questionsMutate.data) === null || _a === void 0 ? void 0 : _a.map((question) => (<QuestionItem_1.default key={question.id} question={question}/>)))}
          </div>
        </div>
        <div className="h-full w-[490px] hidden lg:block">
          <FilterByQuestions_1.default />
        </div>
      </div>
    </PageContainer_1.default>);
};
exports.default = Home;
