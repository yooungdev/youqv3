"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const draft_js_1 = require("draft-js");
const draftjs_to_html_1 = __importDefault(require("draftjs-to-html"));
const image_1 = __importDefault(require("next/image"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_select_1 = __importDefault(require("react-select"));
const react_1 = require("react");
const trpc_1 = require("utils/trpc");
// components/UI
const Button_1 = __importDefault(require("../components/UI/Button"));
// layouts
const PageContainer_1 = __importDefault(require("../layouts/PageContainer"));
// util/gift
const loading_default_gif_1 = __importDefault(require("../utils/gift/loading_default.gif"));
const helping_1 = require("utils/helping");
const router_1 = require("next/router");
const MyEditor = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require("../components/MyEditor"))), {
    ssr: false,
});
const Ask = () => {
    return (<PageContainer_1.default title="Задать вопрос - youq.org">
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full">
          <AskQuestion />
        </div>
      </div>
    </PageContainer_1.default>);
};
const AskQuestion = () => {
    return (<div className="shadow-standart mx-auto rounded-[10px] flex flex-col max-w-[800px] bg-white p-[25px]">
      <div>
        <span className="text-[20px] font-nunito font-bold text-[#232323]">
          Задайте вопрос
        </span>
      </div>
      <div className="flex flex-col">
        <EditAskQuestion />
      </div>
    </div>);
};
const newItemsOptions = [...helping_1.itemsOptions];
newItemsOptions.shift();
const newClassesOptions = [...helping_1.classesOptions];
newClassesOptions.shift();
const EditAskQuestion = () => {
    var _a, _b;
    const [editorState, setEditorState] = (0, react_1.useState)(() => draft_js_1.EditorState.createEmpty());
    const [selectedItem, setSelectedItem] = (0, react_1.useState)(newItemsOptions[0]);
    const [selectedClass, setSelectedClass] = (0, react_1.useState)(newClassesOptions[0]);
    const questionMutate = trpc_1.trpc.useMutation([
        "question_protected.create_question",
    ]);
    const router = (0, router_1.useRouter)();
    if ((_a = questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.data) === null || _a === void 0 ? void 0 : _a.id)
        router.push(`/question/${(_b = questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.data) === null || _b === void 0 ? void 0 : _b.id}`);
    const onCreateQuestion = () => {
        try {
            const blocks = (0, draft_js_1.convertToRaw)(editorState.getCurrentContent()).blocks;
            const value = blocks
                .map((block) => (!block.text.trim() && "\n") || block.text)
                .join("\n");
            questionMutate.mutateAsync({
                text: value,
                textHtml: (0, draftjs_to_html_1.default)((0, draft_js_1.convertToRaw)(editorState.getCurrentContent())),
                item: selectedItem.value,
                class: selectedClass.value,
            });
            setEditorState(draft_js_1.EditorState.createEmpty());
        }
        catch (error) { }
    };
    return (<div>
      <MyEditor editorState={editorState} setEditorState={setEditorState} placeholder="Напишите свой вопрос (Сделайте его простым и понятным, чтобы получить такой же ответ:))"/>
      <div className="flex justify-between mt-[15px]">
        <div className="flex">
          <react_select_1.default className="w-[200px]" defaultValue={selectedItem} onChange={setSelectedItem} options={newItemsOptions} placeholder="Выбери предмет"/>
          <react_select_1.default className="ml-[10px] w-auto" defaultValue={selectedClass} onChange={setSelectedClass} options={newClassesOptions} placeholder="Твой класс"/>
        </div>
        <div className="flex">
          <Button_1.default disabled={(questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.status) === "loading"} onClick={onCreateQuestion} className={`py-[5px] h-[40px] w-[210px] px-[30px] flex items-center justify-center rounded-[15px] font-nunito border-none outline-none bg-[#4971FF] text-white text-[18px] font-bold cursor-${(questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.status) === "loading" ? "progress" : "pointer"} ${(questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.status) !== "loading" && "hover:bg-[#2851E4]"}`}>
            {(questionMutate === null || questionMutate === void 0 ? void 0 : questionMutate.status) === "loading" ? (<image_1.default src={loading_default_gif_1.default} height={40} objectFit="contain" alt="loading_default"/>) : ("Задать вопрос")}
          </Button_1.default>
        </div>
      </div>
    </div>);
};
exports.default = Ask;
