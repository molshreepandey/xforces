import convertToJson from "@/actions/tojson";
import { SubmissionPayload } from "@repo/types";
import redis from "./redis";
import test from "./tester";
export default async function startWorker({
  GROUP_NAME,
  CONSUMER_NAME,
  STREAM_KEY,
}: {
  GROUP_NAME: string;
  CONSUMER_NAME: string;
  STREAM_KEY: string;
}) {
  while (true) {
    try {
      const results = await redis.xreadgroup(
        "GROUP",
        GROUP_NAME,
        CONSUMER_NAME,
        "COUNT",
        1,
        "BLOCK",
        2000,
        "STREAMS",
        STREAM_KEY,
        ">",
      );

      if (!results) continue;
      console.log(results);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const messages: any = results[0];
      console.log(messages);
      const task = messages[1][0];
      console.log("task");
      console.log(task);
      const taskid = task[0];
      console.log("taskid");
      console.log(taskid);
      const taskcode = task[1];
      console.log(taskcode);
      const jsonObject: SubmissionPayload = convertToJson(taskcode);
      console.log(jsonObject);
      await test(jsonObject);
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      await redis.xack(STREAM_KEY, GROUP_NAME, taskid);
      await redis.xdel(STREAM_KEY, taskid);
    } catch (err) {
      console.error("Worker Error:", err);
    }
  }
}
