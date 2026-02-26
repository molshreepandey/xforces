"use client";
import { SubmitCode } from "@/actions/editor";
import { PollSubmissionStatus } from "@/actions/pollStatus";
import { CodeEditorSchema } from "@/lib/editor/editor";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

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
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const pollForResult = async (taskId: string) => {
    const MAX_ATTEMPTS = 60; 
    let attempts = 0;

    while (attempts < MAX_ATTEMPTS) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      attempts++;

      try {
        const status = await PollSubmissionStatus(taskId);

        if (status && status.state === "completed") {
          setResult(`Result: ${status.remark}`);
          setSubmitting(false);
          return;
        }

        setResult(`Judging... (${attempts/2}s)`);
      } catch {
        setResult("Error checking status. Please try again.");
        setSubmitting(false);
        return;
      }
    }
    setResult("Judging timed out. Please check back later.");
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Editor toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border shrink-0">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
          Code Editor
        </span>
        <span className="text-xs text-text-muted">
          {codeEditorParam.language.toUpperCase()}
        </span>
      </div>

      <div className="h-3/4 min-h-0">
        <MonacoEditor
          content={codeEditorParam.content}
          editorRef={editorRef}
          language={codeEditorParam.language}
        />
      </div>

      {/* Submit bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface border-t border-border shrink-0">
        {result && (
          <span className="text-xs text-text-muted">{result}</span>
        )}
        {!result && <span></span>}
        <button
          disabled={submitting}
          onClick={async () => {
            setSubmitting(true);
            setResult(null);
            try {
              const id = await SubmitCode({
                code: `${codeEditorParam.content.header+"\n"+ editorRef.current.getValue() as string +"\n"+ codeEditorParam.content.main}`,
                userId: userid,
                problemid: codeEditorParam.content.problemid,
                memory: "512",
                timelimit: 1000,
                input: codeEditorParam.content.input,
                output: codeEditorParam.content.output,
              });
              setResult(`Submitted! Judging...`);
              pollForResult(id.taskId as string);
            } catch (e) {
              setResult("Submission failed. Please try again.");
              setSubmitting(false);
            }
          }}
          className="px-6 py-2 bg-success text-white font-semibold text-sm rounded-lg hover:bg-success-hover transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
