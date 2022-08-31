import { memo, useState, useRef } from "react";
//
import { Editor, EditorState, convertToRaw } from "draft-js";
//
import draftToHtml from "draftjs-to-html";
// components/UI
import Button from "./UI/Button";
//
import { trpc } from "../utils/trpc";

type MyEditorProps = {
  placeholder?: string | undefined;

  editorState: any;
  setEditorState: any;
};

const MyEditor = ({ 
  placeholder,

  editorState,
  setEditorState
}: MyEditorProps) => {


  const ref: any = useRef(null);

  return (
    <>
      <div
        onClick={() => {
          ref?.current?.focus();
        }}
        className="min-h-[150px] max-h-[300px] overflow-y-auto rounded-[8px] cursor-text p-[11px] my-[10px] border-[2px] border-[hsl(0, 0%, 80%)]"
      >
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          ref={ref}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default memo(MyEditor);
