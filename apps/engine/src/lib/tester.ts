import { SubmissionPayload } from "@repo/types";
import { docker } from "./docker";
import { CONTAINER_NAME } from "..";
import { Writable } from "stream";
import Dockerode from "dockerode";

const MAX_OUTPUT_SIZE = 100 * 1024;

export default async function test(payload: SubmissionPayload) {
  let container: Dockerode.Container | undefined;
  let stream: NodeJS.ReadWriteStream | undefined;
  try {
    const codeBase64 = Buffer.from(payload.code).toString("base64");
    console.log("inside the tester");
    console.log(payload);
    const cmd = [
      "/bin/sh",
      "-c",
      `echo "${codeBase64}" | base64 -d > main.cpp && g++ -o app main.cpp && ./app`,
    ];
    console.log("container created");
    container = await docker.createContainer({
      Image: CONTAINER_NAME,
      Cmd: cmd,
      Tty: false,
      OpenStdin: true,
      StdinOnce: true,
      AttachStdin: true,
      HostConfig: {
        Memory: Number(payload.memory)*1024*1024,
        NetworkMode: "none",
      },
    });
    console.log("stream created");
    stream = await container.attach({
      hijack: true,
      stream: true,
      stdin: true,
      stdout: true,
      stderr: true,
    });
    console.log("container commadn to start");
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
        setTimeout(() => reject(new Error("TLE")), Number(payload.timelimit)+800),
      );

    await container.start();

    console.log("container  start");
    if (payload.input) {
      stream.write(String(payload.input));
    }
    stream.end();
    const ContainerPromise = container.wait();
    const exicutionresult:{StatusCode: number}  = await Promise.race([ContainerPromise, timeLimit()]);
    console.log("exicution result");
    console.log(exicutionresult);
    console.log("Execution finished with code:", exicutionresult.StatusCode);
    if (exicutionresult.StatusCode === 0) {
      console.log("success");
      console.log(output);
    } else {
      console.log("error");
      console.log(errorOutput);
    }
  } catch (err: any) {
    console.log("error");
    console.log(err);
    console.log("error message");
    console.log(err.message);
  } finally {
    if (stream) {
      stream.end();
    }
    if (container) {
      await container.remove({force:true});
    }
  }
}
