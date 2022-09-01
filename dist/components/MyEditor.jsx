"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
//
const draft_js_1 = require("draft-js");
const MyEditor = ({ placeholder, editorState, setEditorState }) => {
    const ref = (0, react_1.useRef)(null);
    return (<>
      <div onClick={() => {
            var _a;
            (_a = ref === null || ref === void 0 ? void 0 : ref.current) === null || _a === void 0 ? void 0 : _a.focus();
        }} className="min-h-[150px] max-h-[300px] overflow-y-auto rounded-[8px] cursor-text p-[11px] my-[10px] border-[2px] border-[hsl(0, 0%, 80%)]">
        <draft_js_1.Editor editorState={editorState} onChange={setEditorState} ref={ref} placeholder={placeholder}/>
      </div>
    </>);
};
exports.default = (0, react_1.memo)(MyEditor);
