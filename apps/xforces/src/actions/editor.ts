"use server"
import redis from "@/lib/redis";
import { SubmissionPayload } from "@repo/types";

export const SubmitCode = async (submission: SubmissionPayload) => {
  // console.log("redis submistion started");
  const taskId = await redis.xadd(
    "tasks", "*",
    "userId", JSON.stringify(submission.userId),
    "problemid", JSON.stringify(submission.problemid),
    "code", JSON.stringify(submission.code),
    "input", JSON.stringify(submission.input),
    "output", JSON.stringify(submission.output),
    "timelimit", JSON.stringify(submission.timelimit),
    "memory", JSON.stringify(submission.memory)
  );
  const redispipeline = redis.pipeline();
  redispipeline.hset(`status:${taskId}`, {
    state: "queued",
    result: {}
  });
  redispipeline.expire(`status:${taskId}`, 300);
  await redispipeline.exec();
  return { taskId };
}


