"use client";
import { SubmitCode } from "@/actions/editor";
import { CodeEditorSchema } from "@/lib/editor/editor";
import dynamic from "next/dynamic";
import { useRef } from "react";

const MonacoEditor = dynamic(() => import("@/lib/editor/editor"), {
  ssr: false,
});

export default function editorpage({
  codeEditorParam,
  userid,
}: {
  codeEditorParam: Omit<CodeEditorSchema, "editorRef">;
  userid: string;
}) {
  const editorRef = useRef<any>(null);
  return (
    <div className="flex flex-col">
      <MonacoEditor
        content={codeEditorParam.content}
        editorRef={editorRef}
        language={codeEditorParam.language}
      />
      <button
        onClick={async () => {
          const id = await SubmitCode({
            code: editorRef.current.getValue() as String,
            userid: userid,
            memory: "512",
            timelimit: "1000",
            input: codeEditorParam.content.input,
            output: codeEditorParam.content.output,
          });
          console.log("id");
          console.log(id);
        }}
      >
        submit
      </button>
    </div>
  );
}
