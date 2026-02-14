import { SubmissionPayload } from "@repo/types";
import { docker } from "./docker";
import { CONTAINER_NAME } from "..";
import {Writable} from "stream";




export default async function test(payload:SubmissionPayload){
  const codeBase64 = Buffer.from(payload.code).toString('base64');
  console.log("inside the tester");
  console.log(payload);
    const cmd = [
      '/bin/sh', 
      '-c', 
      `echo "${codeBase64}" | base64 -d > main.cpp && g++ -o app main.cpp && ./app`
    ];
  console.log("container created");
    const container = await docker.createContainer({
      Image: CONTAINER_NAME, 
      Cmd: cmd,
      Tty: false,         
      OpenStdin: true,   
      StdinOnce: true,    
      AttachStdin: true,
      HostConfig: {
        Memory: 128 * 1024 * 1024, 
        NetworkMode: 'none',
      }
    });
    console.log("stream created");
    const stream = await container.attach({
      hijack:true,
      stream: true,
      stdin: true,
      stdout: true,
      stderr: true
    });
    console.log("container commadn to start");
    let output="";
    let errorOutput="";
    const stdoutStream = new Writable({
        write(chunk, encoding, callback) {
          output += chunk.toString();
          callback();
        }
      });
    
      const stderrStream = new Writable({
        write(chunk, encoding, callback) {
          errorOutput += chunk.toString();
          callback();
        }
      });
    container.modem.demuxStream(stream, stdoutStream, stderrStream);
    
    await container.start();
    console.log("container  start");
      if (payload.input) {
        stream.write(String(payload.input)); 
      }
      stream.end();
      const result = await container.wait();
      console.log(result);
      console.log("Execution finished with code:", result.StatusCode);
      console.log("output");
      console.log(output);
      console.log("error");
      console.log(errorOutput);
      await container.remove();
}