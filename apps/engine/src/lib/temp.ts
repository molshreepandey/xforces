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

  const stream = await container.attach({
    stream: true,
    stdin: true,
    stdout: true,
    stderr: true
  });

  await container.start();

  stream.write(inputTestCase);
  stream.end(); 
  const result = await container.wait();
  console.log(result);
  console.log("Execution finished with code:", result.StatusCode);
  
  await container.remove();
}


runSubmission();