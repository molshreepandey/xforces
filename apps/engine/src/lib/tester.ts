import { SubmissionPayload } from "@repo/types";
import { docker } from "./docker";
import { CONTAINER_NAME } from "..";

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
      HostConfig: {
        Memory: 128 * 1024 * 1024, 
        NetworkMode: 'none',
      }
    });
    console.log("stream created");
    const stream = await container.attach({
      stream: true,
      stdin: true,
      stdout: true,
      stderr: true
    });
    console.log("container commadn to start");
    await container.start();
    console.log("container  start");
    container.modem.demuxStream(stream, process.stdout, process.stderr);
    
      // 3. Write Input and Close (Fixes the 'String' error)
      // Ensure we pass a primitive string
      if (payload.input) {
        stream.write(String(payload.input)); 
      }
      
      // Use a small delay or wait for container state if needed, 
      // but usually ending the stream is enough to signal EOF to the app
      stream.end();
    
      const result = await container.wait();
      console.log(result);
      console.log("Execution finished with code:", result.StatusCode);
    
      await container.remove();
}