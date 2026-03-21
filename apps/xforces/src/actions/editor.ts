"use server"
// import { auth } from "@/lib/auth";
// import redis from "@/lib/redis";
import { GetBoilerplateSchema, TestRequestResponse } from "@/types/editor";
import { prisma } from "@repo/db";
import { SubmissionPayload } from "@repo/types";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";


export const GetBoilerplate = async (problem: GetBoilerplateSchema)=>{
  console.log("getting boilerpalte: ", problem);
  const questioncontent = await prisma.problemCode.findFirst({
    where:{id: problem.problemid , language: problem.language},
    select:{
      classcode: true
    }
  });
  return questioncontent?.classcode ?? "";
}

export const SubmitCode = async (submission: SubmissionPayload) => {
// const user= await auth();
  // if(!user?.user?.id) return { taskId: null };
  const questioncontent = await prisma.problems.findFirst({
    where:{id: submission.problemid},
    select:{
      memorylimit: true,
      timelimit: true,
      testcases: true,
    }
  });
  const header = new Headers();
  header.append("x-user-id", submission.userId);
  header.append("Content-Type", "application/json");
  console.log("user");
  // console.log(user);
  // console.log(user?.user?.id);
  console.log("reuest header");
  console.log(header);
  console.log("submission");
  console.log(submission);
  const response = await fetch(`${process.env.IRONJUDGE_URL}/run`, {
    method: "POST",
    headers: header,
    body: JSON.stringify(submission),
  });
  
  
  if(!response.ok){
    const requesterror = await response.text();
    console.log(requesterror);
    return {taskId: null};
  }
  console.log(response);
  const result: TestRequestResponse = await response.json();
  console.log(result);
  return { taskId: result.submissionid };

}


