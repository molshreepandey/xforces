import { prisma } from "@repo/db";
import { redirect } from "next/navigation";
import Editorpage from "@/component/editor";
import QuestionBoard from "@/component/questionBoard";
import { EditorLang } from "@/types/editor";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ problemid: number }>;
}) {
  const param = await params;
  const { problemid } = param;
  console.log(problemid);
  const problem = await prisma.questions.findUnique({
    where: {
      id: Number(problemid),
    },
    select: {
      id: true,
      code: true,
      content: true,
      title: true,
      input: true,
      output: true,
    },
  });
  console.log(problem);
  if (!problem) {
    return redirect("/error?message=wrongproblemid");
  }
  return (
    <div className="bg-green-900 min-h-screen flex flex-col">
      <div className="shrink-0">
        <h1>XFroces</h1>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="w-1/3">
          <h1>{problem?.title}</h1>
          <QuestionBoard question={problem?.content || ""} />
          <div>{problem?.input}</div>
          <div>{problem?.output}</div>
        </div>
        <div className="w-2/3 min-h-0">
        <Editorpage content={problem?.code || ""} language={EditorLang.cpp} />
        </div>
      </div>
    </div>
  );
}
