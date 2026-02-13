import { docker } from "./docker";
const userCode = `
#include <iostream>
#include <string>
using namespace std;

int main() {
    string input;
    cin >> input; // Reads from your Input Stream
    cout << "Hello, " << input << "!" << endl; // Sends to Output Stream
    return 0;
}
`;

const inputTestCase = "Siddharth";

async function runSubmission() {
  const codeBase64 = Buffer.from(userCode).toString('base64');

  const cmd = [
    '/bin/sh', 
    '-c', 
    `echo "${codeBase64}" | base64 -d > main.cpp && g++ -o app main.cpp && ./app`
  ];

  const container = await docker.createContainer({
    Image: process.env.CONTAINER_NAME, 
    Cmd: cmd,
    Tty: false,         
    OpenStdin: true,   
    StdinOnce: true,    
    HostConfig: {
      Memory: 128 * 1024 * 1024, 
      NetworkMode: 'none',
    }
  });

  // 3. Attach to streams
  const stream = await container.attach({
    stream: true,
    stdin: true,
    stdout: true,
    stderr: true
  });

  await container.start();

  // 5. Send the Input (The critical part!)
  // This sits in the buffer until "./app" runs and requests "cin >>"
  stream.write(inputTestCase);
  stream.end(); // Important: Tells the container "That's all the input"

  // 6. Capture Output (You need to demultiplex this!)
  // Note: Use the demux function I showed you earlier to separate stdout/stderr
  // For simplicity here, we just wait to see it finish.
  const result = await container.wait();

  console.log("Execution finished with code:", result.StatusCode);
  
  await container.remove();
}




//echo "BASE64_CODE" | base64 -d > main.cpp && g++ -o app main.cpp && ./app
runSubmission();