import { SubmissionPayload } from "@repo/types";
import { docker } from "./docker";
import { CONTAINER_NAME } from "..";
import { Writable } from "stream";
import Dockerode from "dockerode";
import { prisma } from "@repo/db";
import redis from "./redis";

const MAX_OUTPUT_SIZE = 100 * 1024;

export default async function test(payload: SubmissionPayload): Promise<string> {
  let container: Dockerode.Container | undefined;
  let stream: NodeJS.ReadWriteStream | undefined;
  let finaloutput: { userid: string, message: string } = { userid: payload.userId, message: "" };
  console.log(payload);
  try {
    const codeBase64 = Buffer.from(payload.code).toString("base64");
    const cmd = [
      "/bin/sh",
      "-c",
      `echo "${codeBase64}" | base64 -d > main.cpp && g++ -o app main.cpp && ./app`,
    ];
    container = await docker.createContainer({
      Image: CONTAINER_NAME,
      Cmd: cmd,
      Tty: false,
      OpenStdin: true,
      StdinOnce: true,
      AttachStdin: true,
      HostConfig: {
        Memory: Number(payload.memory) * 1024 * 1024,
        NetworkMode: "none",
      },
    });
    stream = await container.attach({
      hijack: true,
      stream: true,
      stdin: true,
      stdout: true,
      stderr: true,
    });
    let output = "";
    let errorOutput = "";
    let isOOM = false;
    const stdoutStream = new Writable({
      write(chunk, encoding, callback) {
        if (output.length < MAX_OUTPUT_SIZE) {
          output += chunk.toString();
        } else if (!isOOM) {
          isOOM = true;
          output += "\n[Output Truncated]";
        }
      },
    });

    const stderrStream = new Writable({
      write(chunk, encoding, callback) {
        if (errorOutput.length < MAX_OUTPUT_SIZE) {
          errorOutput += chunk.toString();
        }
      },
    });
    container.modem.demuxStream(stream, stdoutStream, stderrStream);

    const timeLimit = () =>
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("TLE")), Number(payload.timelimit) + 800),
      );

    await container.start();

    if (payload.input) {
      stream.write(String(payload.input));
    }
    stream.end();
    const ContainerPromise = container.wait();
    const exicutionresult: { StatusCode: number } = await Promise.race([ContainerPromise, timeLimit()]);
    if (exicutionresult.StatusCode === 0) {
      console.log("success");
      console.log(output);
      console.log(payload.output);
      let status = (output.trim() === payload.output);
      console.log(status);
      finaloutput = status ? { userid: payload.userId, message: "successfull" } : { userid: payload.userId, message: "Test case failed" }

    } else {
      console.log("error");
      console.log(errorOutput);
      finaloutput = { userid: payload.userId, message: "failed" };
    }
  } catch (err: any) {
    finaloutput = { userid: payload.userId, message: "Time Limit exceeded" };
  } finally {
    if (stream) {
      stream.end();
    }
    if (container) {
      await container.remove({ force: true });
    }
    console.log("final output");
    console.log(finaloutput);
      await prisma.submission.create({
        data: {
          userId: payload.userId,
          status: "completed",
          remark: finaloutput.message
        }
      })
    return finaloutput?.message || "unknown";
  }
}
