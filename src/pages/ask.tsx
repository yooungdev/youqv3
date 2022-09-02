import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Image from "next/image";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Select from "react-select";
import { useState } from "react";
// components/UI
import Button from "../components/UI/Button";
// layouts
import PageContainer from "../layouts/PageContainer";
// util/gift
import LoadingDefault from "../utils/gift/loading_default.gif";
import { classesOptions, itemsOptions } from "utils/helping";
import { useRouter } from "next/router";
import axios from "axios";

const MyEditor = dynamic(() => import("../components/MyEditor"), {
  ssr: false,
});

const Ask: NextPage = () => {
  return (
    <PageContainer title="Задать вопрос - youq.org">
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full">
          <AskQuestion />
        </div>
      </div>
    </PageContainer>
  );
};

const AskQuestion = () => {
  return (
    <div className="shadow-standart mx-auto rounded-[10px] flex flex-col max-w-[800px] bg-white p-[25px]">
      <div>
        <span className="text-[20px] font-nunito font-bold text-[#232323]">
          Задайте вопрос
        </span>
      </div>
      <div className="flex flex-col">
        <EditAskQuestion />
      </div>
    </div>
  );
};

const newItemsOptions = [...itemsOptions];
newItemsOptions.shift();

const newClassesOptions = [...classesOptions];
newClassesOptions.shift();

const EditAskQuestion = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [createLoadingStatus, setCreateLoadingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const [selectedItem, setSelectedItem] = useState(newItemsOptions[0]);
  const [selectedClass, setSelectedClass] = useState(newClassesOptions[0]);

  const router = useRouter();

  const onCreateQuestion = async () => {
    try {
      setCreateLoadingStatus('loading')
      const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
      const value = blocks
        .map((block) => (!block.text.trim() && "\n") || block.text)
        .join("\n");

      const res = await axios.post(
        "http://localhost:3333/question/createQuestion",
        {
          text: value,
          textHtml: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          item: selectedItem.value,
          class: selectedClass.value,
        }
      );

      if (res.status === 200) {
        router.push(`/question/${res.data.id}`)
        setCreateLoadingStatus('success')
      }

      setEditorState(EditorState.createEmpty());
    } catch (error) {
      setCreateLoadingStatus('error')
    }
  };

  return (
    <div>
      <MyEditor
        editorState={editorState}
        setEditorState={setEditorState}
        placeholder="Напишите свой вопрос (Сделайте его простым и понятным, чтобы получить такой же ответ:))"
      />
      <div className="flex justify-between mt-[15px]">
        <div className="flex">
          <Select
            className="w-[200px]"
            defaultValue={selectedItem}
            onChange={setSelectedItem}
            options={newItemsOptions}
            placeholder="Выбери предмет"
          />
          <Select
            className="ml-[10px] w-auto"
            defaultValue={selectedClass}
            onChange={setSelectedClass}
            options={newClassesOptions}
            placeholder="Твой класс"
          />
        </div>
        <div className="flex">
          <Button
            disabled={createLoadingStatus === "loading"}
            onClick={onCreateQuestion}
            className={`py-[5px] h-[40px] w-[210px] px-[30px] flex items-center justify-center rounded-[15px] font-nunito border-none outline-none bg-[#4971FF] text-white text-[18px] font-bold cursor-${
              createLoadingStatus === "loading" ? "progress" : "pointer"
            } ${createLoadingStatus !== "loading" && "hover:bg-[#2851E4]"}`}
          >
            {createLoadingStatus=== "loading" ? (
              <Image
                src={LoadingDefault}
                height={40}
                objectFit="contain"
                alt="loading_default"
              />
            ) : (
              "Задать вопрос"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Ask;
